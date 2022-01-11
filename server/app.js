const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
app.use(bodyParser())
//重新赋值，不然在api那边拿不到值
app.use(async (ctx, next) => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body
    await next()
});
//连接数据库
const config = require('./config')
const mongoose = require('mongoose')

const mongoUrl = `mongodb://${ config.mongodb.user }:${ config.mongodb.password }@${ config.mongodb.host }:${ config.mongodb.port }/${ config.mongodb.database }`
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise
const db = mongoose.connection;
db.on('error', () => {
    console.log('数据库连接出错!');
});
db.once('open', () => {
    console.log('数据库连接成功！');
});

//解决跨域
const cors = require('@koa/cors');
app.use(cors())

// 使用response中间件（注意使用组件的顺序）
const response = require('./middlewares/response.js')
app.use(response);

//使用路由
const router = require('./router/index')
//使用路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('http://localhost:3000')
})

