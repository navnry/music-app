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
    [types.SET_PALY_PROGRESS](state, process) {
        state.playProgress = process
    },
    [types.SET_CURRENT_THUMB](state, thumb) {
        state.currentThumb = thumb
    },

    [types.LOGIN_STATE] (state, num) {
        state.loginState = num
    },
    [types.SET_LEVEL] (state, num) {
        state.level = num
    },
    [types.ACCOUNT_UID] (state, id) {
        state.accountUid = id
    },
}
export default mutations
