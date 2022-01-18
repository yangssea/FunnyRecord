//给用户发送邮件
const nodemailer = require('nodemailer')

module.exports = function send(mail) {
    //验证码
    let yzm = Math.floor(Math.random()*(9999-1000)) + 1000

    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'yzx596238662@163.com',
            // 这里密码不是qq密码，是你设置的smtp授权码，去qq邮箱后台开通、查看
            pass: 'VPPTECEULFZYMDJZ',
        }
    })

    let mailOptions = {
        from: 'yzx596238662@163.com', // sender address
        to: mail, // list of receivers
        subject: '来至funnyRecord的验证码', // 随机数
        // 发送text或者html格式
        text: yzm + '' // plain text body
        // html: `'<h1>'+ ( +'</h1>'`// html body
    }

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Message sent: %s', info.messageId);
        console.log(info)
    });

    return yzm
}
