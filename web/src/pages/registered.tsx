import React, {Component} from 'react'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import {Login} from '../schemas/login'
import ApiServe from "../service/login"
import events from "node:events";

export default class Registered extends Component<any, Login> {
    constructor(props: any) {
        super(props)
    }

    state = {
        email: '',
        password: '',
        confirm: '',
        yzm: undefined,
        emailError: ''
    }

    onBlurs(e){
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(!reg.test(this.state.email)){
            this.setState({emailError: '邮箱格式错误'})
        }else{
            this.setState({emailError: ''})
        }
    }

    setEmail(e: any){
        this.setState({email: e.target.value})
    }
    //发送邮件
    sendEmail() {
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(!reg.test(this.state.email)){
            this.setState({emailError: '邮箱格式错误'})
            return
        }
        ApiServe.getEmail({email: this.state.email}).then((res) => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    submit() {
        console.log(this.state)
    }

    // componentDidMount(): void {
    // }

    render() {
        return (
            <div className="login-layout sign-layout">
                {/*<img className="login-sign" src={require('../static/signUp.png')} />*/}
                <div  className="login-sign">登录</div>
                <div className="input">
                    <img className="logo" src={require('../static/login-logo.png')} />
                    <div>
                        <img  src={require('../static/Email.png')} />
                        <TextField
                            label="邮箱"
                            error
                            defaultValue={this.state.email}
                            onBlur={this.onBlurs.bind(this)}
                            helperText={this.state.emailError}
                            onChange={this.setEmail.bind(this)(this ,'email')}
                            variant="standard"></TextField>
                    </div>
                    <div className="verify">
                        <img  src={require('../static/do.png')} />
                        <TextField
                            label="验证码"
                            error
                            // helperText="Incorrect entry."
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment  onClick={this.sendEmail.bind(this)} position="end">
                                        <SendToMobileIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"></TextField>
                    </div>
                    <div>
                        <img  src={require('../static/Password.png')} />
                        <TextField  type="password" label="密码" variant="standard"></TextField>
                    </div>
                    <div>
                        <img  src={require('../static/confim.png')} />
                        <TextField  type="password" label="确定密码" variant="standard"></TextField>
                    </div>
                </div>
                <div className="button">
                    <Button onClick={this.submit.bind(this)} variant="contained" size="large">注册</Button>
                </div>
                <div className="sign-up">
                    已经注册?点此<span>登录</span>
                </div>
                <div className="footer">
                    帮忙关注一下我的掘金“辰酒”
                </div>
            </div>
        )
    }
}