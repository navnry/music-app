import Vue from 'vue'
import VueRouter from 'vue-router'
import {Toast} from 'vant';

Vue.use(Toast)
const Login = () => import('@/views/login')
const Find = () => import('@/views/find')
const Video = () => import('@/views/video')
const Mine = () => import('@/views/mine')
const Village = () => import('@/views/village')
const User = () => import('@/views/user')
const Sheetlist = () => import('@/components/sheetlist/index2.vue')

Vue.use(VueRouter)


const routes = [
    {
        path: '',
        redirect: '/find'
    },

    {
        path: '/find',
        name: 'find',
        component: Find,
        meta: {
            title: "发现",
            requireAuth: true,
            showTabbar: true,
            showTopbar: true
        }
    },
    {
        path: '/video',
        name: 'video',
        component: Video,
        meta: {
            title: "视频",
            requireAuth: true,
            showTabbar: true,
            showTopbar: true
        }
    },
    {
        path: '/mine',
        name: 'mine',
        component: Mine,
        meta: {
            title: "我的",
            requireAuth: true,
            showTabbar: true,
            showTopbar: false
        }
    },
    {
        path: '/village',
        name: 'village',
        component: Village,
        meta: {
            title: "云村",
            requireAuth: true,
            showTabbar: true,
            showTopbar: false
        }
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
            title: "账号",
            requireAuth: true,
            showTabbar: true,
            showTopbar: false
        }
    },
    {
        path: '/sheetlist',
        name: 'sheetlist',
        component: Sheetlist,
        meta: {
            title: "列表",
            requireAuth: true,
            showTabbar: false,
            showTopbar: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: "登录",
            requireAuth: false,
            showTabbar: false,
            showTopbar: false
        }
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面meta */
    if (to.meta.content) {
        let head = document.getElementsByTagName('head');
        let meta = document.createElement('meta');
        meta.content = to.meta.content;
        head[0].appendChild(meta)
    }
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()


    let loginState = localStorage.getItem("loginState");
    if (loginState === "1") {
        next()
        if (!to.meta.requireAuth) {
            next({
                path: '/find'
            })
        }
    } else {
        if (to.meta.requireAuth) {
            Toast("您当前暂未登录，请先登录！")
            next({
                path: '/login',
            })
        } else {
            next()
        }
    }


});

router.afterEach(route => {
    window.scroll(0, 0);
});

export default router
