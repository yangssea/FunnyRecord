const userModel = require('../model/user')
const sendEmail = require('../util/sendEmail')
const jwt = require('jsonwebtoken')

let emailList = []

//设置过期时间
const setTime = (email) => {
    console.log(emailList)
    setTimeout(() => {
        emailList.forEach(e => {
            if(e.email === email){
                e.time = false
            }
        })
    }, 1000 * 60)
}

//验证邮箱
let emailRule = (email, ctx, next) => {
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if(!reg.test(ctx.body.email)){
        ctx.success({
            msg: '邮箱格式不正确!',
            status: 500
        })
        return true
    }
    return  false
}


class loginApi{
    //发送邮件
    static setEmail(ctx, next){
        //如果邮箱为空返回
        if(ctx.body.email == null){
            ctx.success({
                msg: '无邮箱名!',
                status: 500
            })
            return
        }
        // if(!reg.z-example(ctx.body.email)){
        //     ctx.success({
        //         msg: '邮箱格式不正确!',
        //         status: 500
        //     })
        //     return
        // }
        if(emailRule(ctx.body.email, ctx, next)) return
        //不在60s内返回
        let outTime = true
        emailList.map(e => {
            if(e.email === ctx.body.email && e.time === true){
                outTime = false
                ctx.success({
                    msg: '请在规定时间内发送!',
                    status: 500
                })
                return
            }
        })
        if(!outTime) return
        //发送邮件
        let yzm = sendEmail(ctx.body.email || '')
        // let yzm = 1234
        let sign = true
        // 验证码已替换
        emailList.map(e => {
            if(e.email === ctx.body.email){
                e.yzm = yzm
                e.time = true
                sign = false
                return
            }
        })
        //新的邮箱
        if(sign){
            emailList.push({
                email: ctx.body.email,
                yzm: yzm,
                time: true
            })
        }
        //给发送时间一个期限
        setTime(ctx.body.email)
        // console.log(emailList.length, '??????')
        ctx.success({
            msg: '查询成功!',
            status: 200
        })
    }
    //新增/修改用户
    static async addUser(ctx, next) {
        console.log(ctx.body)
        const {email, yzm, password, update} = ctx.body
        if(emailRule(email, ctx, next)) return
        //邮箱被注册不能再次注册
        let result = await userModel.find({}, e => {console.log('login')})
        let replay = false
        result.map(e => {
            if(e.email === email) {
                replay = true
            }
        })
        if(replay && !update) {
            ctx.success({msg: '邮箱已被注册!', type: 500});
            return
        }
        if(password == null || (password && password.length < 6)){
            ctx.success({
                msg: '至少六位数密码!',
                type: 500
            });
            return
        }
        //如果验证码不为空且和发送的验证码相等。
        //如果验证通过删除缓存
        if(yzm){
            let sign = false
            emailList.map((e, i) => {
                if(e.email === email && e.yzm == yzm){
                    sign = true
                    emailList.splice(i, 1)
                    return
                }
            })
            if(sign){
                if(update){
                    await userModel.findOneAndUpdate({email: email}, {
                        password: password
                    }).catch(e => console.log(e))
                    ctx.success({
                        msg: '修改用户密码成功!',
                        type: 200,
                        data: 'success'
                    });
                    return
                }
                let result = await userModel.create({
                    email: email,
                    password: password
                }).catch(e => console.log(e))
            }else {
                ctx.success({
                    msg: '验证码错误!',
                    type: 500
                });
                return
            }
        }
        ctx.success({
            msg: '新建成功!',
            data: 'success'
        });
    }
    //登录
    static async login(ctx, next) {
        try {
            const {email, password} = ctx.body
            console.log(ctx.body)
            if(emailRule(email, ctx, next)) return
            if(email && password) {
                let result = await userModel.find({}, e => {console.log(e)})
                let sign = true
                //根据用户生成一个token
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: 'foobar'
                }, email)
                result.map(e => {
                    console.log(e.email === email && e.password === password)
                    if(e.email === email && e.password === password){
                        ctx.success({
                            msg: '登录成功!',
                            data: token
                        });
                        sign = false
                        return
                    }
                })
                if(!sign) return
            }
            ctx.success({
                msg: '用户名或密码错误!',
                status: 500
            });
        }catch (e) {
            console.log(e, 'error')
        }

    }
}


module.exports = exports = loginApi