import axios from 'axios'

import {
    bannerSwiper,
    perSong,
    songUrl,
    checkSong,
    songLyric,
    recommendSheet,
    recommendSheetList,
    songComment,
    phoneRegistered,
    phoneLogin,
    loginStatus,
    userDetail,
    songDetail
} from './config'
// 请求超时时间
axios.defaults.timeout = 30000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


export default {

    /**
     * 获取网络时间
     */
    getOnlineTime() {
        return axios.get("http://quan.suning.com/getSysTime.do")
    },


    /**
     * 检测手机号码是否已注册
     * @param {*} phone 手机号
     */
    phoneRegisteredFn(phone) {
        return axios.get(phoneRegistered, {
            params: {
                phone
            }
        })
    },


    phoneLoginFn(phone, password) {
        return axios.get(phoneLogin, {
            params: {
                phone: phone || '',
                password: password || ''
            }
        })
    },


    /**
     * 获取当前登录状态
     */
    loginStatusFn() {
        return axios.get(loginStatus)
    },

    /**
     * 登陆后调用此接口 , 传入用户 id, 可以获取用户详情
     * @param {*} uid 用户id
     */
    userDetailFn(uid) {
        return axios.get(userDetail, {
            params: {
                uid
            }
        })
    },

    /**
     * 请求发现页面首页轮播图
     */
    bannerSwiperFn() {
        return axios.get(bannerSwiper)
    },


    /***
     * 请求推荐歌单
     * @param {*} limit 取出数量 , 默认为 30 (不支持 offset)
     */

    recommendSheetFn(limit) {
        return axios.get(recommendSheet, {
            params: {
                limit: limit
            }
        })
    },

    /***
     *
     */

    recommendSheetListFn(id) {
        return axios.get(recommendSheetList, {
            params: {
                id: id,
                limit: 1000
            }
        })
    },
    /***
     *请求推荐歌曲
     */
    perSongFn(id) {
        return axios.get(perSong, {
            params: {
                id,
            }
        })
    },
    /**
     *  使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url
     * 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 )
     * 可以获取对应的音乐的 url( 不需要登录 )
     * @param {*} id 音乐 id
     * @param {*} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
     */
    songUrlFn(id, br) {
        return axios.get(songUrl, {
            params: {
                id,
                br
            }
        })
    },

    /**
     * 传入歌曲 id, 可获取音乐是否可用
     * @param {*} id 歌曲 id
     * @param {*} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
     */
    checkSongFn(id, br) {
        return axios.get(checkSong, {
            params: {
                id,
                br
            }
        })
    },

    /**
     * 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
     * @param {*} id 歌曲id
     */
    songLyricFn(id) {
        return axios.get(songLyric, {
            params: {
                id
            }
        })
    },
    /**
     * 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
     * @param {*} id 歌曲id
     */
    songDetailFn(id) {
        return axios.get(songDetail, {
            params: {
                ids:id
            }
        })
    },

    songCommentFn(id, limit) {
        return axios.get(songComment, {
            params: {
                id: id,
                limit: limit
            }
        })
    }
}
