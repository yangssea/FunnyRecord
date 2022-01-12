const Router = require('koa-router')
// router = new Router({})
router = new Router()
const Api = require('../api/todo')

router
    .get('/todo/get', Api.getAllTodo)
    .post('/todo/save',  Api.saveTodo)
    .patch('/todo/update',  Api.updateTodo)
    .delete('/todo/delete',  Api.deleteTodo)

exports = module.exports = router
