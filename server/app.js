const Koa = require('koa')
const config = require('./config')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const response = require('./middlewares/response')
const body = require('./middlewares/body')
const router = require('./router/index')


const app = new Koa()
//解析请求体
app.use(bodyParser())
//重新赋值，不然在api那边拿不到值
app.use(body)


//连接数据库
const mongoUrl = `mongodb://${ config.mongodb.user }:${ config.mongodb.password }@${ config.mongodb.host }:${ config.mongodb.port }/${ config.mongodb.database }`
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', () => {
    console.log('数据库连接出错!')
})
db.once('open', () => {
    console.log('数据库连接成功！')
})

//解决跨域
app.use(cors())

// 使用response中间件（注意使用组件的顺序）
app.use(response)

//使用路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('http://localhost:3000')
})

