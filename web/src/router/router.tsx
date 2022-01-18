import { lazy, ReactNode } from 'react';

const Layout = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const SignUp = lazy(() => import('../pages/registered'));



interface IRouter {
    title: string
    path: string
    exact?: boolean
    component?: ReactNode
    children?: IRouter[]
}

const router: IRouter[] = [
    {
        path: '/',
        title: '首页',
        component: <Layout/>
    },
    {
        path: '/login',
        title: '登录',
        component: <Login/>
    },
    {
        path: '/signUp',
        title: '登录',
        component: <SignUp/>
    }
]
export default router;
