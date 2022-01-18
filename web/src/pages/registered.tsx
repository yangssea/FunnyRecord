import React, {Component} from 'react'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment'
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import {Login} from '../schemas/login'

export default class Registered extends Component<any, Login> {
    constructor(props: any) {
        super(props)
    }

    state = {
        email: '',
        password: '',
        confirm: '',
        yzm: undefined
    }

    onBlurs(){
        console.log('????')
    }

    setEmail(e: any){
       console.log(e.target.value)
    }

    submit() {
        console.log(this.state)
    }
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
                            defaultValue={this.state.email}
                            onChange={this.setEmail}
                            variant="standard"></TextField>
                    </div>
                    <div className="verify">
                        <img  src={require('../static/do.png')} />
                        <TextField
                            label="验证码"
                            onBlur={this.onBlurs.bind(this)}
                            error
                            // helperText="Incorrect entry."
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SendToMobileIcon />
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