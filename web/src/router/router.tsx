import { lazy, ReactNode } from 'react';

const Layout = lazy(() => import('../pages/home'));

interface IRouter {
    title: string
    path: string
    component?: ReactNode
    childern?: IRouter[]
}

const router: IRouter[] = [
    {
        path: '/layout',
        title: '首页',
        component: <Layout/>
    }
]
export default router;
