import { lazy, ReactNode } from 'react';

const Layout = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));


interface IRouter {
    title: string
    path: string
    component?: ReactNode
    childern?: IRouter[]
}

const router: IRouter[] = [
    {
        path: '/er',
        title: '首页',
        component: <Layout/>
    },
    {
        path: '/login',
        title: '登录',
        component: <Login/>
    }
]
export default router;
