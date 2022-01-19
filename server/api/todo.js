const todoModel = require('../model/todo')

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
        const query = ctx.body
        let result = await todoModel.create(query)
            .catch(e => console.log(e))
        ctx.success({
            msg: '新建成功!',
            data: result
        })
    }

    static async updateTodo(ctx, next) {
        console.log(ctx.body, '??????')
        const { id, title, sub, stutas, userId, time } = ctx.body
        // let todo = new ()
        let result = await todoModel.findByIdAndUpdate(id, {
            title,
            sub,
            stutas,
            userId,
            time
        }).catch(e => console.log(e))
        ctx.success({
            msg: '更新成功!',
            data: result
        });
    }

    static async deleteTodo(ctx, next) {
        console.log(ctx.body, '??????')
        const {id} = ctx.body
        // let todo = new ()
        let result = await todoModel.findByIdAndRemove(id).
        catch(e => console.log(e))
        ctx.success({
            msg: '删除成功!',
            data: result
        });
    }
}


module.exports = exports = todoApi