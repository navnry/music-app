const api = process.env.NODE_ENV === 'development' ? '/api' : ''

// ===================发现页面
export const bannerSwiper = api + '/banner?type=2' // 请求发现页面轮播图
export const perSong = api + '/personalized/newsong' // 请求推荐歌曲
// ======================播放歌曲
export const songUrl = api + '/song/url' // 获取歌曲url
export const checkSong = api + '/check/music' // 查看歌曲是否可用
export const songLyric = api + '/lyric' // 获取歌词
