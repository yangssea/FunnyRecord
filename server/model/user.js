const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

//定义字段
const user = new Schema({
    email: String,
    password: String,
    img: String,
    name: String,
    sub: String,
    time: Date
})

user.path('time').get(function (v) {
    return v ? moment(v).format('YYYY-MM-DD hh:mm:ss') : ""
})

exports = module.exports = mongoose.model('user', user, "user")
