const todoModel = require('../model/todo')
// const mongoose = require('mongoose')
//
// const Schema = mongoose.Schema


class todoApi{
    static async getAllTodo(ctx, next){
        let result = await todoModel.find({}, (err, docs) => {
            if (!err) {
                console.log(err)
            }
        })
        ctx.success({
            msg: '查询成功!',
            data: result
        });
    }

    static async saveTodo(ctx, next){
        console.log(ctx.body, '??????')
        const { title, sub, stutas, userId, time } = ctx.body
        // let todo = new ()
        let result = await todoModel.create({
            title,
            sub,
            stutas,
            userId,
            time
        }).catch(e => console.log(e))
        ctx.success({
            msg: '新建成功!',
            data: result
        });
    }
}


module.exports = exports = todoApi