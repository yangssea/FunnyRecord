const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

//定义字段
const todo = new Schema({
    title: String,
    sub: String,
    stutas: Number,
    userId: String,
    time: Date
})
//先set在get
todo.set('toJSON', {getters: true, virtuals: true})
todo.set('toObject', {getters: true, virtuals: true})
todo.path('time').get(function (v) {
    return v ? moment(v).format('YYYY-MM-DD hh:mm:ss') : ""
})
//注意第三个参数收藏集
//另一种方式
// const schema = new mongo.Schema({}, { collection: "YoRHa" })
// const YoRHa = mongo.model("YoRHa", schema)
exports = module.exports = mongoose.model('todo', todo, "todo")
