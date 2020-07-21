import Vue from 'vue'
import VueRouter from 'vue-router'

const Find = () => import('@/views/find')
const Video = () => import('@/views/video')
const Mine = () => import('@/views/mine')
const Village = () => import('@/views/village')
const User = () => import('@/views/user')
const Sheetlist = () => import('@/components/sheetlist')
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
    },
    {
        path: '/video',
        name: 'video',
        component: Video
    },
    {
        path: '/mine',
        name: 'mine',
        component: Mine
    },
    {
        path: '/village',
        name: 'village',
        component: Village
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/sheetlist',
        name: 'sheetlist',
        component: Sheetlist,
        meta: {
            full: true
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
