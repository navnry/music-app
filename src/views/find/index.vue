<template>
    <div class="find" ref="recommend">
        <Banner></Banner>
        <div class="sheet">
            <div class="wrap">
                <div class="item" v-for="item in recommendSheet">
                    <div class="pic">
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="con">
                        <p class="txt-cut">{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <scroll class="recommend-content" ref="scroll" :data="playList">
            <div>
                <div class="recommend-song" ref="recommendSong">
                    <ul>
                        <li class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
                            <div class="icon">
                                <img :src="item.image">
                            </div>
                            <div class="text">
                                <p class="name">{{item.name}}</p>
                                <p class="singer">{{item.singer}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Scroll from '@/components/scroll'
    import api from '@/api'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import Banner from './components/banner'

    export default {
        name: "find",
        data() {
            return {
                banner: [],
                playList: [],
                recommendSheet: [],
                recommendMusic: [],
                searchValue: '',

            }
        },
        created() {
            this._getRecommendMusic()
            this._getRecommendSheet()
        },
        mounted() {
        },
        computed: {
            ...mapGetters([
                'playing',
            ])
        },
        methods: {
            open() {
                this.setFullScreen(true)
            },
            selectSong(item) {
                this.insertSong(item)
            },

            _singerName(arr) {
                let name = []
                name = arr.map(function (item) {
                    return item.name
                })
                return name.join('/')
            },
            _getRecommendSheet() {
                api.recommendSheetFn().then(res => {
                    console.log(res.data.result);
                    if (res.status === 200) {
                        this.recommendSheet = res.data.result
                    }
                })
            },
            _getRecommendMusic() {
                api.perSongFn().then((res) => {
                    if (res.status === 200) {
                        let list = res.data.result.map((item) => {
                            return {
                                id: item.id,
                                singer: this._singerName(item.song.artists),
                                name: item.name,
                                album: item.song.album.name,
                                image: item.song.album.picUrl
                            }
                        })
                        list.splice(9)
                        this.recommendMusic = list
                    } else {
                        console.error('getRecommendMusic 获取失败')
                    }
                })
            },
            ...mapMutations({
                setMuiscList: 'SET_MUSIC_LIST',
                setFullScreen: 'SET_FULL_SCREEN'
            }),
            ...mapActions([
                'insertSong'
            ])
        },
        components: {
            Scroll,
            Banner
        }
    }
</script>

<style lang="less" scoped>
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .top-tip {
        display: flex;
        align-items: center;

        .search {
            flex: 1;
            /*margin-right: 10px;*/
        }

        .circle {
            margin-right: 12px;
            width: 32px;
            height: 32px;

            .van-circle {
                padding: 3px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    animation: rotate 10s linear infinite;

                    &.pause {
                        animation-play-state: paused;
                    }
                }
            }
        }
    }

    .find {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;

        .sheet {
            padding: 10px 0;
            .wrap {
                padding: 10px;

                &::after {
                    content: "";
                    display: block;
                    height: 0;
                    line-height: 0;
                    visibility: hidden;
                    clear: both;
                }

                .item {
                    width: 32%;
                    float: left;
                    margin-right: 2%;
                    margin-top: 2%;
                    &:nth-child(-n+3){
                        margin-top: 0;
                    }

                    &:nth-child(3n) {
                        margin-right: 0;
                    }

                    .pic {
                        width: 100%;
                        padding-bottom: 100%;
                        position: relative;
                        border-radius: 8px;
                        overflow: hidden;

                        img {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .con {
                        font-size: 12px;
                        padding: 5px;
                        line-height: 1.5;
                        p {
                            height: 3em;
                            overflow: hidden;
                        }
                    }
                }
            }
        }

        .recommend-content {
            width: 100%;
            overflow: hidden;

            .decorate {
                position: absolute;
                top: -30vh;
                z-index: -10;
                width: 100%;
                height: 50vh;
                vertical-align: inherit;
            }

            .slider-wrapper {
                width: 96%;
                margin: 0 auto;
                border-radius: 5px;
                overflow: hidden;
            }

            .recommend-song {
                box-sizing: border-box;
                width: 100%;
                text-align: center;
                padding: 0 10px;

                .title {
                    height: 65px;
                    line-height: 65px;
                    padding-left: 1.5%;
                    text-align: left;
                    font-weight: bold;
                }

                .item {
                    position: relative;
                    box-sizing: border-box;
                    padding: 5px 0;
                    display: flex;
                    align-items: center;

                    .icon {
                        position: relative;
                        width: 40px;
                        height: 40px;
                        margin-right: 5px;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 3px;
                        }
                    }

                    .text {
                        flex: 1;
                        line-height: 16px;
                        text-align: left;
                    }

                    .name {
                        font-size: .28rem;
                        color: #555555;
                    }

                    .singer {
                        font-size: .2rem;
                        color: #888888;
                    }
                }
            }
        }
    }


</style>
