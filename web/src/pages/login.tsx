import React, {Component} from 'react'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button';



export default class Sidebar extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="login-layout">
                <div className="input">
                    <img className="logo" src={require('../static/login-logo.png')} />
                    <div>
                        <img  src={require('../static/Email.png')} />
                        <TextField id="standard-basic" label="邮箱" variant="standard"></TextField>
                    </div>
                    <div>
                        <img  src={require('../static/Password.png')} />
                        <TextField id="standard-basic" label="密码" variant="standard"></TextField>
                    </div>
                </div>
                <div className="button">
                    <Button variant="contained" size="large">登录</Button>
                </div>
                <div className="footer">
                    帮忙关注一下我的掘金“辰酒”
                </div>
            </div>
        )
    }
}