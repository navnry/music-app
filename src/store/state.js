import {playMode} from '@/assets/js/config'

const state = {
    musicList: {},
    singer: {},
    playing: false,//是否正在播放
    fullScreen: false,//是否全屏
    playlist: [],//播放列表
    sequenceList: [],  // 顺序列表
    mode: playMode.sequence, // 播放模式
    currentIndex: -1, // 当前播放索引
    disc: {},
    topList: {},
    playProgress: 0,
    currentThumb: 'https://s1.music.126.net/style/favicon.ico'
}

export default state
