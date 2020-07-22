<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="van-slide-up">
            <div class="normal-player" v-show="fullScreen">
                <div class="plyerBg" :style="{'backgroundImage': 'url(' + currentSong.image + ')'}"></div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="iconfont icon-fanhui_xia"></i>
                    </div>
                    <div class="info">
                        <h1 class="title" v-html="currentSong.name"></h1>
                        <h2 class="subtitle" v-html="currentSong.singer"></h2>
                    </div>
                    <div class="share">
                        <i class="iconfont icon-jingyunyinxiaopt"></i>
                    </div>
                </div>
                <div class="middle" @click="changeMiddle">
                    <transition name="middleL">
                        <div class="middle-l" v-show="currentShow === 'cd'">
                            <div class="cd-contro" :class="{'pause': !playing}">
                                <img src="../../assets/images/cd_contro.png" alt="">
                            </div>
                            <div class="cd-wrapper">
                                <div class="cd play" :class="{'pause': !playing}">
                                    <img :src="currentSong.image" class="image">
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="middleR">
                        <scroll class="middle-r" ref="lyricList" v-show="currentShow === 'lyric'"
                                :data="currentLyric && currentLyric.lines">
                            <div class="lyric-wrapper">
                                <div class="currentLyric" v-if="currentLyric">
                                    <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}"
                                       v-for="(line, index) in currentLyric.lines" :key="line.key">
                                        {{line.txt}}
                                    </p>
                                </div>
                                <p class="no-lyric" v-if="currentLyric === null">{{upDatecurrentLyric}}</p>
                            </div>
                        </scroll>
                    </transition>
                </div>
                <div class="bottom">
                    <Operation
                            :total="total"
                            @downLoad="downLoad"
                            @showComment="showComment"
                    />
                    <progress-bar
                            :currentTime="format(currentTime)"
                            :allTime="format(duration)"
                            :percent="percent"
                            @progressChanged="percentChangeEnd"/>
                    <panel
                            :iconMode="iconMode"
                            @changeMode="changeMode"
                            @prev="prev"
                            @play="togglePlaying"
                            @next="next"
                            @showPlaylist="showPlaylist"/>
                </div>
            </div>
        </transition>
        <Comment
                :commentData="commentData"
                :songname="currentSong.name"
                ref="comment"
        />
        <playlist
                @stopMusic="stopMusic"
                ref="playlist"/>
        <audio
                autoplay
                preload="auto"
                id="music-audio"
                ref="audio"
                @ended="end"
                @canplay="ready"
                @error="error"
                @timeupdate="updateTime"/>
    </div>
</template>

<script>
    import ProgressCircle from './components/circle'
    import ProgressBar from './components/bar'
    import Panel from './components/panel'
    import Playlist from './components/list'
    import Comment from './components/comment'
    import Operation from './components/operation'
    import Lyric from 'lyric-parser'
    import Scroll from '@/components/scroll'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import api from '@/api'
    import {playMode, shuffle} from '@/assets/js/config'
    import Lyc from './components/lyc'
    import saveAs from 'file-saver';
    import {Dialog, Toast} from 'vant';

    export default {
        name: '',
        data() {
            return {
                // id: 0,
                url: '',
                songReady: false,
                currentTime: 0,
                duration: 0,
                percent: 0,
                radius: 34,
                currentLyric: null,
                currentLineNum: 0,
                currentShow: 'cd',
                playingLyric: '',
                noLyric: false,
                total: "",
                commentData: {}
            }
        },
        components: {
            ProgressBar,
            ProgressCircle,
            Scroll,
            Playlist,
            Comment,
            Panel,
            Lyc,
            Operation,
            Dialog,
            Toast,

        },
        computed: {
            iconMode() {
                if (this.mode === playMode.sequence) {
                    return 'icon-xunhuan-wangyiicon'
                } else if (this.mode === playMode.loop) {
                    return 'icon-loop'
                } else {
                    return 'icon-suijibofang'
                }
            },
            upDatecurrentLyric() {
                if (this.noLyric) {
                    return '暂无歌词'
                }
                if (!this.noLyric) {
                    return '纯音乐，请欣赏'
                }
            },
            ...mapGetters([
                'playlist',
                'fullScreen',
                'currentSong',
                'playing',
                'currentIndex',
                'mode',
                'sequenceList',
                'playProgress'
            ])
        },
        watch: {
            currentSong(newVal, oldVal) {
                if (!newVal.id) {
                    return
                }
                if (newVal.id === oldVal.id) {
                    return
                }
                // this.$refs.audio.pause()
                this.$refs.audio.currentTime = 0
                this._getSong(newVal.id)
            },
            url(newUrl) {
                this._getLyric(this.currentSong.id)
                this._getComment(this.currentSong.id, 10)
                this.$refs.audio.src = newUrl
                let stop = setInterval(() => {
                    this.duration = this.$refs.audio.duration
                    if (this.duration) {
                        clearInterval(stop)
                    }
                }, 150)
                this.setPlayingState(true)
            },
            currentTime() {
                this.percent = (this.currentTime / this.duration) * 100
                this.setPlayProgress(this.percent)
            }
        },
        methods: {


            /**
             *  删除最后一首的时候暂停音乐
             */
            stopMusic() {
                this.$refs.audio.pause()
            },


            /**
             * 封面与歌词界面切换
             */
            changeMiddle() {
                this.currentShow === 'cd' ? this.currentShow = 'lyric' : this.currentShow = 'cd'
            },

            /**
             * 切换顺序播放，单曲循环，随机播放
             */
            changeMode() {
                const mode = (this.mode + 1) % 3
                this.setPlayMode(mode)
                let list = null
                if (mode === 0) {
                    Toast('已切换为顺序播放！');
                    list = this.sequenceList
                } else if (mode === 1) {
                    Toast('已切换为单曲循环！');
                    list = this.sequenceList
                } else {
                    Toast('已切换为随机播放！');
                    list = shuffle(this.sequenceList)
                }

                // if (mode === playMode.random) {
                //     list = shuffle(this.sequenceList)
                // } else {
                //     list = this.sequenceList
                // }
                this._resetCurrentIndex(list)
                this.setPlaylist(list)
            },

            /**
             * 拖动进度条
             * @param percent:拖动进度
             */
            percentChangeEnd(percent) {
                const currentTime = this.duration * percent
                this.$refs.audio.currentTime = currentTime
                if (!this.playing) {
                    this.$refs.audio.play()
                    this.setPlayingState(true)
                }
                if (this.currentLyric) {
                    this.currentLyric.seek(currentTime * 1000)
                }
            },

            /**
             * 音频播放进度
             */
            updateTime(e) {
                this.currentTime = e.target.currentTime
            },


            format(interval) {
                interval = interval | 0
                let minute = interval / 60 | 0
                let second = interval % 60
                if (second < 10) {
                    second = '0' + second
                }
                return minute + ':' + second
            },

            /**
             * 播放完一首音乐
             */
            end() {
                if (this.mode === playMode.loop) {
                    this.loop()
                } else {
                    this.next()
                }
            },

            /**
             * 循环播放
             */
            loop() {
                this.$refs.audio.currentTime = 0
                this.setPlayingState(true)
                this.$refs.audio.play()
                if (this.currentLyric) {
                    this.currentLyric.seek()
                }
            },

            /**
             * audio错误状态
             */
            error() {
                this.songReady = true
            },
            /**
             * audio准备好播放
             */
            ready() {
                this.songReady = true
                this.savePlayHistory(this.currentSong)
            },

            /**
             * 下一曲
             */
            next() {
                if (!this.songReady) {
                    return
                }
                if (this.playlist.length === 1) {
                    this.loop()
                    return
                } else {
                    let index = this.currentIndex + 1
                    if (index === this.playlist.length) {
                        index = 0
                    }
                    this.setCurrentIndex(index)
                    // this.$refs.audio.play()
                    if (this.playing) {
                        this.togglePlaying()
                    }
                }
                this.songReady = false
            },

            /**
             * 上一曲
             */
            prev() {
                if (!this.songReady) {
                    return
                }
                this.songReady = false
                let index = this.currentIndex - 1
                if (index === -1) {
                    index = this.playlist.length - 1
                }
                this.setCurrentIndex(index)
                if (!this.playing) {
                    this.togglePlaying()
                }
                this.songReady = false
            },

            /**
             * 关掉播放界面
             */
            back() {
                this.setFullScreen(false)
                this.currentShow = 'cd'
            },

            /**
             * 播放与暂停
             */
            togglePlaying() {
                const audio = this.$refs.audio
                this.setPlayingState(!this.playing)
                this.playing ? audio.play() : audio.pause()
                if (this.currentLyric) {
                    this.currentLyric.togglePlay()
                }
            },

            /**
             * 获取歌曲详细
             * @param id:歌曲id
             */
            _getSong(id) {
                api.songUrlFn(id).then((res) => {
                    this.url = res.data.data[0].url
                })
                this.setCurrentThumb(this.currentSong.image)
            },

            /**
             * 获取歌曲评论
             * @param id:歌曲id
             * @param limt: 取出数量
             */
            _getComment(id, limt) {
                api.songCommentFn(id, limt).then(res => {
                    this.commentData = res.data
                    // console.log(res.data);
                    let totalTmp = res.data.total
                    if (totalTmp > 100000) {
                        this.total = "10w+"
                    } else if (totalTmp > 10000) {
                        this.total = "1w+"
                    } else if (totalTmp > 1000) {
                        this.total = "999+"
                    } else {
                        this.total = totalTmp.toString()
                    }

                })
            },

            /**
             * 获取歌词
             * @param id:歌曲id
             */
            _getLyric(id) {
                if (this.currentLyric) {
                    this.currentLyric.stop()
                    this.currentLyric = null
                }
                this.noLyric = false
                api.songLyricFn(id).then((res) => {
                    this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
                    if (this.playing) {
                        this.currentLyric.play()
                        this.currentLineNum = 0
                        this.$refs.lyricList.scrollTo(0, 0, 1000)
                    }
                }).catch(() => {
                    this.currentLyric = null
                    this.noLyric = true
                    this.currentLineNum = 0
                })
            },

            /**
             * 重置播放列表
             */
            _resetCurrentIndex(list) {
                let index = list.findIndex((item) => {
                    return item.id === this.currentSong.id
                })
                this.setCurrentIndex(index)
            },

            /**
             * 歌词滚动
             */
            handleLyric({lineNum, txt}) {
                this.currentLineNum = lineNum
                if (lineNum > 5) {
                    let lineEl = this.$refs.lyricLine[lineNum - 5]
                    this.$refs.lyricList.scrollToElement(lineEl, 1000)
                } else {
                    this.$refs.lyricList.scrollTo(0, 0, 1000)
                }
            },

            /**
             *  下载歌曲
             */
            downLoad() {
                Dialog.confirm({
                    message: "确定要下载 “ " + this.currentSong.name + " ” 吗？"
                }).then(() => {
                    var FileSaver = require('file-saver');
                    FileSaver.saveAs(this.url)
                })
            },

            /**
             * 展示评论页面
             */
            showComment() {
                this.$refs.comment.show()
            },


            /**
             * 打开正在播放列表
             */
            showPlaylist() {
                this.$refs.playlist.show()
            },


            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayMode: 'SET_PLAY_MODE',
                setPlaylist: 'SET_PLAYLIST',
                setPlayProgress: 'SET_PALY_PROGRESS',
                setCurrentThumb: 'SET_CURRENT_THUMB'
            }),
            ...mapActions([
                'savePlayHistory'
            ])
        },

    }
</script>

<style lang="less" scoped>

    .player {
        width: 100%;
        height: 100%;

        .normal-player {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 150;
            overflow: hidden;
            background-color: #000000;

            .plyerBg {
                position: absolute;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: 50%;
                transition-duration: .5s;
                -webkit-filter: blur(20px);
                filter: blur(20px);
                -webkit-transform: scale(1.5);
                -ms-transform: scale(1.5);
                transform: scale(1.5);
                z-index: -1;


                &::before {
                    position: absolute;
                    content: "";
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .5);
                }
            }


            .top {
                position: relative;
                margin-bottom: 25px;
                color: #ffffff;
                display: flex;
                align-items: center;
                padding: 12px 10px;

                .back {
                    margin-right: 10px;

                    i {
                        font-size: 18px;
                    }

                }

                .info {
                    flex: 1;
                    text-align: center;

                    .title {
                        font-weight: normal;
                        font-size: 16px;
                    }

                    .subtitle {
                        font-weight: normal;
                        font-size: 12px;
                    }
                }

                .share {
                    margin-left: 10px;

                    i {
                        font-size: 18px;
                    }
                }

            }

            .middle {
                display: flex;
                align-items: center;
                position: fixed;
                width: 100%;
                top: 80px;
                bottom: 170px;
                white-space: nowrap;
                font-size: 0;

                .middle-l {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    /*padding-top: 80%;*/

                    &.middleL-enter-active, &.middleL-leave-active {
                        transition: all 0.3s
                    }

                    &.middleL-enter, &.middleL-leave-to {
                        opacity: 0
                    }

                    .cd-contro {
                        position: absolute;
                        left: 46%;
                        /*top: -1.2rem;*/
                        top: 0;
                        z-index: 1;
                        transform-origin:.2rem top;
                        transform: rotate(0);
                        transition-duration: .5s;

                        &.pause{
                            transform: rotate(-25deg);
                        }

                        img {
                            display: block;
                            width: 2rem;
                        }
                    }

                    .cd-wrapper {
                        position: absolute;
                        left: 10%;
                        top: 15%;
                        width: 80%;
                        /*height: 100%;*/

                        .cd {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            /*border: 15px solid rgba(255, 255, 255, 0.1);*/
                            border-radius: 50%;
                            background: url("../../assets/images/cd_bg.png") center/cover no-repeat;
                            padding: 55px;

                            &.play {
                                animation: rotate 20s linear infinite;
                            }

                            &.pause {
                                animation-play-state: paused;
                            }

                            .image {
                                /*position: absolute;*/
                                /*left: 0;*/
                                /*top: 0;*/
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                    }
                }

                .middle-r {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;

                    &.middleR-enter-active, &.middleR-leave-active {
                        transition: all 0.2s;
                    }

                    &.middleR-enter, &.middleR-leave-to {
                        opacity: 0;
                    }

                    .lyric-wrapper {
                        width: 80%;
                        margin: 0 auto;
                        overflow: hidden;
                        text-align: center;

                        .text {
                            font-size: .26rem;
                            line-height: 2.4;
                            color: #999999;

                            &.current {
                                color: #FFF;
                            }
                        }

                        .no-lyric {
                            line-height: 40px;
                            margin-top: 60%;
                            font-size: .26rem;
                            color: #dddddd;
                        }
                    }
                }
            }

            .bottom {
                position: absolute;
                bottom: 10px;
                width: 100%;
                color: #dddddd;

                .progress-wrapper {
                    display: flex;
                    align-items: center;
                    width: 80%;
                    margin: 0px auto;
                    padding: 10px 0;

                    .time {
                        flex: 0 0 30px;
                        line-height: 30px;
                        width: 30px;
                        font-size: .2rem;
                        letter-spacing: 1px;

                        &.time-l {
                            text-align: left;
                        }

                        &.time-r {
                            text-align: right;
                        }
                    }

                    .progress-bar-wrapper {
                        flex: 1;
                        margin: 0 5px;
                    }
                }

                .operators {
                    display: flex;
                    align-items: center;

                    .icon {
                        flex: 1;

                        &.disable {
                        }

                        i {
                            font-size: 18px;
                        }

                        .mode {
                            font-size: 18px;
                        }

                        &.i-left {
                            text-align: right;
                        }

                        &.i-center {
                            padding: 0 20px;
                            text-align: center;

                            i {
                                font-size: 40px;
                            }
                        }

                        &.i-right {
                            text-align: left;
                        }

                        .icon-like {
                        }
                    }
                }
            }

        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
