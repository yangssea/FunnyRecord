//FrontendAuth.js
import React, {Component, lazy} from "react";
import {Route, Redirect} from "react-router-dom";
import routers from '../router/router';
const Nodata = lazy(() => import('../pages/noData'));
const Login = lazy(() => import('../pages/login'));



class FrontendAuth extends Component<any, any> {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        const token = localStorage.getItem('token')
        const {location } = this.props
        const { pathname } = location
        console.log(location)
        let sign = false
        routers.map(e => {
            if(e.path === pathname){
                sign = true
            }
        })
        if(!sign) return <Route exact path="*" key="其他">{<Nodata />}</Route>
        if (token) {
            return routers.map(e =>
                (<Route exact path={e.path} key={e.title}>{e.component}</Route>)
            )
        } else {
            if(pathname === '/')
                return  <Redirect  key="other" to='/login'>{<Login />}</Redirect >
            // if(routers.length === 3) routers.pop()
            return routers.map(e =>
                (<Route exact path={e.path} key={e.title}>{e.component}</Route>)
            )
        }
    }
}

export default FrontendAuth;