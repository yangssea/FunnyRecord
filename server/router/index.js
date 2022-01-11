const Router = require('koa-router')
// router = new Router({})
router = new Router()
const Api = require('../api/todo')

router
    .get('/todo/get', Api.getAllTodo)
    .post('/todo/save',  Api.saveTodo)

exports = module.exports = router
