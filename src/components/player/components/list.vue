<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <div class="title">
                        <span class="count"> 当前播放 ({{playlist.length}})</span>
                    </div>
                    <div class="tips">
                        <div class="text" @click="changeMode">
                            <i class="iconfont" :class="iconMode"></i>
                            <span>{{ modeText }}</span>
                        </div>
                        <span class="clear" @click="showConfirm">
              <i class="iconfont icon-lajitong"></i>
            </span>
                    </div>
                </div>
                <scroll ref="listContent" class="list-content" :data="sequenceList" :refreshDelay="refreshDelay">
                    <transition-group name="list" tag="ul">
                        <li class="item" ref="listItem"
                            :class="getCurrentIcon(item)"
                            @click="selectItem(item, index)"
                            v-for="(item, index) in sequenceList" :key="item.id">
                            <i class="iconfont current fa" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="delete" @click.stop="deletOne(item)">
                <i class="iconfont icon-guanbi"></i>
              </span>
                        </li>
                    </transition-group>
                </scroll>
                <div @click="hide" class="list-close">
                    <span>关闭</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Scroll from '@/components/scroll'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {playMode, shuffle} from '@/assets/js/config'
    import {Dialog} from 'vant'

    export default {
        data() {
            return {
                showFlag: false,
                refreshDelay: 100
            }
        },
        computed: {
            modeText() {
                return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
            },
            iconMode() {
                if (this.mode === playMode.sequence) {
                    return 'icon-xunhuan-wangyiicon'
                } else if (this.mode === playMode.loop) {
                    return 'icon-loop'
                } else {
                    return 'icon-suijibofang'
                }
            },
            ...mapGetters([
                'fullScreen',
                'playlist',
                'currentSong',
                'playing',
                'currentIndex',
                'mode',
                'sequenceList',
            ])
        },
        methods: {
            showConfirm() {
                // this.$refs.confirm.show()

                Dialog.confirm({
                    message: '是否清空播放列表？',
                }).then(() => {
                    this.deleteSongList()
                    this.showFlag = false
                    this.$emit('stopMusic')
                }).catch(() => {

                })
            },

            getCurrentIcon(item) {
                if (this.currentSong.id === item.id) {
                    return 'icon-yinliang'
                }
                return ''
            },
            selectItem(item, index) {
                if (this.mode === playMode.random) {
                    // 找到需要播放的歌曲在播放顺序里面的索引
                    index = this.playlist.findIndex((song) => {
                        return song.id === item.id
                    })
                }
                // if (!this.playing) {
                //   this.setPlayingState(true)
                // }
                this.setCurrentIndex(index)
            },
            changeMode() {
                const mode = (this.mode + 1) % 3
                // console.log(this.mode)
                this.setPlayMode(mode)
                let list = null
                if (mode === playMode.random) {
                    list = shuffle(this.sequenceList)
                } else {
                    list = this.sequenceList
                }
                this.resetCurrentIndex(list)
                this.setPlayList(list)
            },
            resetCurrentIndex(list) {
                let index = list.findIndex((item) => {
                    // 返回 index
                    return item.id === this.currentSong.id
                })
                console.log('index', index)
                this.setCurrentIndex(index)
            },
            deletOne(item) {
                this.deleteSong(item)
                if (!this.playlist.length) {
                    this.hide()
                    this.$emit('stopMusic')
                }
            },
            show() {
                this.showFlag = true
                setTimeout(() => {
                    this.$refs.listContent.refresh()
                    this.scrollToCurrent(this.currentSong)
                }, 20)
            },
            hide() {
                this.showFlag = false
            },
            scrollToCurrent(current) {
                const index = this.sequenceList.findIndex((song) => {
                    return current.id === song.id
                })
                this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayMode: 'SET_PLAY_MODE',
                setPlayList: 'SET_PLAYLIST'
            }),
            ...mapActions([
                'deleteSong',
                'deleteSongList'
            ])
        },
        components: {
            Scroll,
            Dialog
        }
    }
</script>

<style lang="less" scoped>
    .playlist {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0, 0, 0, 0.3);

        &.list-fade-enter-active, &.list-fade-leave-active {
            transition: opacity 0.3s;

            .list-wrapper {
                transition: all 0.3s;
            }
        }

        &.list-fade-enter, &.list-fade-leave-to {
            opacity: 0;

            .list-wrapper {
                transform: translate3d(0, 100%, 0);
            }
        }

        .list-wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-radius: 20px 20px 0 0;
            background-color: #eeeeee;

            .list-header {
                position: relative;
                padding: 20px 20px 10px 20px;

                .title {
                    font-size: 12px;
                    margin-bottom: 10px;
                }

                .tips {
                    display: flex;
                    align-items: center;
                    font-weight: normal;

                    .iconfont {
                        margin-right: 5px;
                        font-size: 16px;
                    }

                    .text {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        font-size: 12px;

                        span {
                            padding: 0 2px;
                        }

                        .count {
                            position: relative;
                        }
                    }

                    .clear {
                        color: #444444;

                        i {
                            font-size: 20px;
                            margin-right: 0;
                        }
                    }
                }
            }

            .list-content {
                max-height: 240px;
                overflow: hidden;

                .item {
                    display: flex;
                    align-items: center;
                    padding: 0 20px 0 20px;
                    overflow: hidden;
                    font-size: 12px;
                    height: 30px;
                    color: #555555;

                    &.icon-yinliang {
                        color: #ff0000;

                        &::before {
                            display: none;
                        }
                    }

                    &.list-enter-active, &.list-leave-active {
                        transition: all 0.1s;
                    }

                    &.list-enter, &.list-leave-to {
                        height: 0;
                    }

                    .icon-yinliang {
                        font-size: 24px;
                    }

                    .text {
                        flex: 1;
                        line-height: 20px;
                    }

                    .delete {
                        color: #444444;
                        margin-right: 2px;
                    }
                }
            }

            .list-close {
                text-align: center;
                line-height: 40px;
                font-size: 12px;
                color: #444444;
            }
        }
    }
</style>
