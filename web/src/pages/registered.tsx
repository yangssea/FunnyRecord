import React, {Component} from 'react'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import {Login} from '../schemas/login'
import ApiServe from "../service/login"
import MuiAlert, {AlertColor, AlertProps} from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { withRouter } from 'react-router-dom'
import set = Reflect.set;

//害 mui material的验证就很烦，所以就自己手写了。其他的组件用antd，主要是自己没那么多时间


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
class Registered extends Component<any, Login> {
    constructor(props: any) {
        super(props)
    }

    state = {
        email: '',
        password: '',
        confirm: '',
        yzm: undefined,
        errorMsg: {
            email: '',
            password: '',
            confirm: '',
            yzm: '',
        },
        time: 0,
        tip: {
            open: false,
            severity: 'success',
            tipMsg: ''
        }
    }

    //失去焦点
    onBlurs(type: string){
        let sign = true
        const util = (str: string, msg: string) => {
            let {errorMsg}  = this.state
            errorMsg[str] = msg
            this.setState({errorMsg: errorMsg})
            if(msg.length > 1) sign = false
        }
        if(type === 'email'){
            let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
            if(!reg.test(this.state.email)){
              util('email', '邮箱格式错误')
            }else{
                util('email', '')
            }
        }
        if(type === 'yzm') {
            if(this.state.yzm == undefined){
                util('yzm', '验证码不能为空')
            }else{
                util('yzm', '')
            }
        }
        if(type === 'password') {
            if(this.state.password == ''){
                util('password', '密码不能为空')
            }else if(this.state.password.length < 6){
                util('password', '密码必须大于六位数')
            }else{
                util('password', '')
            }
        }
        if(type === 'confirm') {
            if(this.state.confirm == ''){
                util('confirm', '确定密码不能为空')
            }else if(this.state.confirm.length < 6){
                util('confirm', '确定密码必须大于六位数')
            }else if(this.state.confirm !== this.state.password){
                util('confirm', '密码不一致')
            }else{
                util('confirm', '')
            }
        }
        return sign
    }
    //绑定输入框的变量
    setValue(type:string, e: any){
        switch (type) {
            case 'email': this.setState({email: e.target.value}); break;
            case 'yzm': this.setState({yzm: e.target.value}); break;
            case 'confirm': this.setState({confirm: e.target.value}); break;
            case 'password': this.setState({password: e.target.value}); break;
        }
    }
    //发送邮件
    sendEmail() {
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(!reg.test(this.state.email)){
            let {errorMsg}  = this.state
            errorMsg.email = '邮箱格式错误'
            this.setState({errorMsg: errorMsg})
            return
        }
        ApiServe.getEmail({email: this.state.email}).then((res) => {
            if(res.data){

            }
            this.openAlert('success', '验证码已发送')
            let i = 59;
            let time = setInterval(() => {
                this.setState({time: i--})
                if(i < 0) clearInterval(time)
            }, 1000)
        }).catch(e => {
            console.log(e)
        })
    }
    //弹框相关信息
    openAlert(type, msg) {
        this.setState({tip: {open: true, severity: type, tipMsg: msg}})
        setTimeout(() => {
            this.setState({tip: {open: false, severity: type, tipMsg: msg}})
        }, 1500)
    }

    submit() {
        let arr = ['email', 'yzm', 'password', 'confirm']
        let sign = true
        arr.map(e => {
           if(!this.onBlurs(e)){
               sign = false
           }
        })
        if(!sign){
            this.openAlert('warning', '请正确填写表单')
        }else{
            //提交表单
            let {password, email, yzm} = this.state
            let update = false
            if(this.props.location && this.props.location.update) update = true
            ApiServe.saveUser({password: password, email: email, yzm: yzm, update: update}).then(e => {
               if(!e.data){
                   this.openAlert('warning', e.msg)
               }else{
                   if(update) this.openAlert('success', '修改成功')
                   else this.openAlert('success', '注册成功')
                   setTimeout(() => {
                       this.props.history.push('/login');
                   }, 500)
               }
            }).catch(e => {
                this.openAlert('warning', '网络错误')
            })
        }
    }

    toRouter(){
        this.props.history.push('/login');
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <div className="login-layout sign-layout">
                {/*<img className="login-sign" src={require('../static/signUp.png')} />*/}
                <div  className="login-sign" onClick={this.toRouter.bind(this)}>登录</div>
                <div className="input">
                    <img className="logo" src={require('../static/login-logo.png')} />
                    <div>
                        <img  src={require('../static/Email.png')} />
                        <TextField
                            label="邮箱"
                            error
                            helperText={this.state.errorMsg.email}
                            onBlur={this.onBlurs.bind(this,'email')}
                            onChange={this.setValue.bind(this,'email')}
                            variant="standard"></TextField>
                    </div>
                    <div className="verify">
                        <img  src={require('../static/do.png')} />
                        <TextField
                            label="验证码"
                            error
                            helperText={this.state.errorMsg.yzm}
                            onChange={this.setValue.bind(this,'yzm')}
                            onBlur={this.onBlurs.bind(this,'yzm')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment  position="end">
                                        {this.state.time > 0 ?this.state.time :<SendToMobileIcon onClick={this.sendEmail.bind(this)} />}
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"></TextField>
                    </div>
                    <div>
                        <img  src={require('../static/Password.png')} />
                        <TextField
                            type="password"
                            label="密码"
                            error
                            helperText={this.state.errorMsg.password}
                            onBlur={this.onBlurs.bind(this,'password')}
                            onChange={this.setValue.bind(this,'password')}
                            variant="standard"></TextField>
                    </div>
                    <div>
                        <img  src={require('../static/confim.png')} />
                        <TextField
                            type="password"
                            label="确定密码"
                            error
                            helperText={this.state.errorMsg.confirm}
                            onBlur={this.onBlurs.bind(this,'confirm')}
                            onChange={this.setValue.bind(this,'confirm')}
                            variant="standard"></TextField>
                    </div>
                </div>
                <div className="button">
                    <Button onClick={this.submit.bind(this)} variant="contained" size="large">注册</Button>
                </div>
                <div className="sign-up">
                    已经注册?点此<span onClick={this.toRouter.bind(this)}>登录</span>
                </div>
                <div className="footer">
                    帮忙关注一下我的掘金“辰酒”
                </div>
                <Snackbar
                    open={this.state.tip.open}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    autoHideDuration={6000}>
                    <Alert severity={this.state.tip.severity as AlertColor}>{this.state.tip.tipMsg}</Alert>
                </Snackbar>
            </div>
        )
    }
}

export default withRouter(Registered)