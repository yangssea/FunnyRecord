//使用非受控组件的方式开发 其他页面表单会使用受控组件的方式开发
import React, {Component} from 'react'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {Login} from '../schemas/login'
import ApiServe from "../service/login";
import MuiAlert, {AlertColor, AlertProps} from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { withRouter } from 'react-router-dom'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})
class LoginIn extends Component<any, Login> {
    constructor(props: any) {
        super(props)
    }

    state ={
        email: '',
        password: '',
        errorMsg: {
            email: '',
            password: ''
        },
        tip: {
            open: false,
            severity: 'success',
            tipMsg: ''
        }
    }

    onBlurs(type){
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
        if(type === 'password') {
            if(this.state.password == ''){
                util('password', '密码不能为空')
            }else if(this.state.password.length < 6){
                util('password', '密码必须大于六位数')
            }else{
                util('password', '')
            }
        }
        return sign
    }

    setValue(type, e){
        switch (type) {
            case 'email': this.setState({email: e.target.value}); break;
            case 'password': this.setState({password: e.target.value}); break;
        }
    }

    //弹框相关信息
    openAlert(type, msg) {
        this.setState({tip: {open: true, severity: type, tipMsg: msg}})
        setTimeout(() => {
            this.setState({tip: {open: false, severity: type, tipMsg: msg}})
        }, 1500)
    }

    submit() {
        let arr = ['email', 'password']
        let sign = true
        arr.map(e => {
            if(!this.onBlurs(e)) sign = false
        })
        if(!sign){
            this.openAlert('warning', '请正确填写表单')
        }else{
            //提交表单
            let {password, email} = this.state
            ApiServe.login({password: password, email: email}).then(e => {
                if(!e.data){
                    this.openAlert('warning', e.msg)
                }else{
                    this.openAlert('success', '登录成功')
                    console.log(e.data, 'token')
                    localStorage.setItem('email', email)
                    localStorage.setItem('token', e.data)
                    setTimeout(() => {
                        // this.props.history.push( '/')
                        window.open("/")
                    }, 500)
                }
            }).catch(e => {
                this.openAlert('warning', '网络错误')
            })
        }
    }

    toRouter(type){
        if(type === 2){
            this.props.history.push('/signUp')
            return
        }
        this.props.history.push({pathname: '/signUp', update: true});
    }

    render() {
        return (
            <div className="login-layout">
                {/*<img className="login-sign" src={require('../static/signUp.png')} />*/}
                <div  className="login-sign" onClick={this.toRouter.bind(this, 2)}>注册</div>
                <div className="input">
                    <img className="logo" src={require('../static/login-logo.png')} />
                    <div>
                        <img  src={require('../static/Email.png')} />
                        <TextField
                            id="standard-basic"
                            label="邮箱"
                            error
                            helperText={this.state.errorMsg.email}
                            onBlur={this.onBlurs.bind(this,'email')}
                            onChange={this.setValue.bind(this,'email')}
                            variant="standard"></TextField>
                    </div>
                    <div>
                        <img  src={require('../static/Password.png')} />
                        <TextField
                            id="standard-basic"
                            type="password"
                            label="密码"
                            error
                            helperText={this.state.errorMsg.password}
                            onBlur={this.onBlurs.bind(this,'password')}
                            onChange={this.setValue.bind(this,'password')}
                            variant="standard"></TextField>
                    </div>
                </div>
                <div className="button">
                    <Button onClick={this.submit.bind(this)} variant="contained" size="large">登录</Button>
                </div>
                <div className="sign-up">
                    密码忘了?点此<span onClick={this.toRouter.bind(this)}>修改</span>
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

export default withRouter(LoginIn)