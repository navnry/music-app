import * as types from './mutation-types'

const mutations = {
    [types.SET_MUSIC_LIST](state, musicList) {
        state.musicList = musicList
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_TOP_LIST](state, topList) {
        state.topList = topList
    },
    [types.SET_PLAY_HISTORY](state, history) {
        state.playHistory = history
    },
    [types.SET_PALY_PROGRESS](state, process) {
        state.playProgress = process
    },
    [types.SET_CURRENT_THUMB](state, thumb) {
        state.currentThumb = thumb
    },

    // 设置用户登陆状态
    [types.LOGIN_STATE] (state, num) {
        state.loginState = num
    },
    [types.SET_LEVEL] (state, num) {
        state.level = num
    },
    // 存取用户 uid
    [types.ACCOUNT_UID] (state, id) {
        state.accountUid = id
    },
}

export default mutations
