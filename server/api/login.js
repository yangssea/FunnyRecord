const todoModel = require('../model/todo')
const sendEmail = require('../util/sendEmail')

class loginApi{
    static setEmail(ctx, next){
        console.log(ctx.body, '??????')
        let yzm = sendEmail(ctx.body.email || '')
        ctx.success({
            msg: '查询成功!',
            data: yzm
        });
    }

}


module.exports = exports = loginApi