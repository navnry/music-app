const api = process.env.NODE_ENV === 'development' ? '/api' : ''


// ===================登陆
export const phoneLogin = api + '/login/cellphone' // 手机号登陆
export const phoneRegistered = api + '/cellphone/existence/check' // 手机号是否被注册
export const sendVerify = api + '/captcha/sent' // 发送验证码
export const verify = api + '/captcha/verify' // 验证验证码
export const loginStatus = api + '/login/status' // 登录状态
export const logout = api + '/logout' // 退出登录
export const signIn = api + '/daily_signin' // 签到
export const register = api + '/register/cellphone' // 注册修改密码
export const userDetail = api + '/user/detail' // 用户详情
// ===================发现页面
export const bannerSwiper = api + '/banner?type=2' // 请求发现页面轮播图
export const recommendSheet = api + '/personalized' // 请求推荐歌单
export const recommendSheetList = api + '/playlist/detail' // 请求推荐歌单
export const perSong = api + '/personalized/newsong' // 请求推荐歌曲
// ======================播放歌曲
export const songUrl = api + '/song/url' // 获取歌曲url
export const checkSong = api + '/check/music' // 查看歌曲是否可用
export const songLyric = api + '/lyric' // 获取歌词
export const songComment = api + '/comment/music' // 获取歌词
