import Api from "../util/request"

//处理数据结构可以在service
//页面逻辑单独在页面中处理

// 将结果返回出去。
let ApiServe = {
    getEmail: undefined
}

//获取邮箱
ApiServe.getEmail = (data) => {
    return Api({
        method: 'post',
        url: 'login/email',
        data,
        success: (res) => res
    })
}

export default ApiServe