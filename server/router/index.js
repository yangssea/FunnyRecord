const Router = require('koa-router')
// router = new Router({})
router = new Router()
const todoApi = require('../Api/todo')
const loginApi = require('../Api/login')
const jwt = require('jsonwebtoken')
//由于时间有限，后端暂不做参数校验。
//关于密码和文章的加密后期再做
//权限认证没有做成中间件

//权限认证
let verify = async (ctx, next) => {
    const {email, token} = ctx.request.header
    console.log(ctx.request.header)
    try{
        let decoded = jwt.verify(token, email)
        console.log(decoded)
    }catch (e) {
        ctx.success({
            msg: 'token已过期!',
            type: 100
        });
        return
    }
    await next()
}
router
    .get('/todo/get', verify, todoApi.getAllTodo)
    .post('/todo/save', verify, todoApi.saveTodo)
    .patch('/todo/update', verify, todoApi.updateTodo)
    .delete('/todo/delete', verify, todoApi.deleteTodo)
    .post('/login/email', loginApi.setEmail)
    .post('/login/save', loginApi.addUser)
    .post('/login/login', loginApi.login)


exports = module.exports = router
