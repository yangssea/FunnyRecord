const Router = require('koa-router')
// router = new Router({})
router = new Router()
const todoApi = require('../Api/todo')
const loginApi = require('../Api/login')


router
    .get('/todo/get', todoApi.getAllTodo)
    .post('/todo/save',  todoApi.saveTodo)
    .patch('/todo/update',  todoApi.updateTodo)
    .delete('/todo/delete',  todoApi.deleteTodo)
    .post('/login/email', loginApi.setEmail)

exports = module.exports = router
