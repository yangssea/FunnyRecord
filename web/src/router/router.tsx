import { lazy, ReactNode } from 'react';

const Layout = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const SignUp = lazy(() => import('../pages/registered'));
const Test = lazy(() => import('../z-example/Context'));




interface IRouter {
    title: string
    path: string
    exact?: boolean
    component?: ReactNode
    children?: IRouter[]
}

const router: IRouter[] = [
    {
        path: '/login',
        title: '登录',
        component: <Login/>
    },
    {
        path: '/signUp',
        title: '注册',
        component: <SignUp/>
    },
    {
        path: '/test',
        title: '测试',
        component: <Test/>
    },
    {
        path: '/',
        title: '首页',
        component: <Layout/>
    }
]


export default router;
