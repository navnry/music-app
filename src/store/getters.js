const getters = {

    loginState: state => state.loginState,
    level: state => state.level,
    accountUid: state => state.accountUid,

    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playlist: state => state.playlist,
    sequenceList: state => state.sequenceList,
    mode: state => state.mode,
    currentIndex: state => state.currentIndex,
    playProgress: state => state.playProgress,
    currentThumb: state => state.currentThumb,
    currentSong: (state) => {
        return state.playlist[state.currentIndex] || []
    }
}

export default getters
