<template>
    <div class="find" ref="recommend">
        <Banner></Banner>
        <div class="sheet">
            <h3>推荐歌单</h3>
            <div class="wrap">
                <div class="item" v-for="item in recommendSheet" @click="skip(item.id)">
                    <div class="pic">
                        <img :src="item.picUrl" v-lazy="item.picUrl" alt="">
                        <div class="count">
                            <i class="iconfont icon-zanting"></i>
                            <span>{{formatCount(item.playCount)}}</span>
                        </div>
                    </div>
                    <div class="con">
                        <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <scroll class="song" ref="scroll" :data="playList">
            <h3>推荐歌曲</h3>
            <div class="wrap" ref="recommendSong">
                <div class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
                    <div class="pic">
                        <img :src="item.image" v-lazy="item.image">
                    </div>
                    <div class="text">
                        <p class="name">{{item.name}}</p>
                        <p class="singer">{{item.singer}}</p>
                    </div>
                    <div class="icon">
                        <i class="iconfont icon-zanting"></i>
                    </div>
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
            skip(id) {
                this.$router.push({
                    path: '/sheetlist',
                    query: {
                        id: id
                    }
                })
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
                                image: item.song.album.picUrl,
                                total: this._getComment(item.id)
                            }
                        })
                        list.splice(9)
                        this.recommendMusic = list
                    } else {
                        console.error('getRecommendMusic 获取失败')
                    }
                })
            },

            _getComment(id, limt) {
                api.songCommentFn(id, limt).then(res => {
                    return {
                        total: res.data.total
                    }
                })
            },
            formatCount(val) {
                if (val > 100000000) {
                    return (val / 100000000).toFixed(2) + "亿"
                } else if (val > 10000) {
                    return (val / 10000).toFixed(2) + "万"
                } else {
                    return val
                }
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


    .find {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;

        .sheet {
            padding: 10px 0;

            h3 {
                font-size: 14px;
                padding: 8px 10px;
            }

            .wrap {
                padding: 0 10px;
                white-space: nowrap;
                overflow-x: auto;

                &::-webkit-scrollbar {
                    display: none;
                }

                /*&::after {*/
                /*    content: "";*/
                /*    display: block;*/
                /*    height: 0;*/
                /*    line-height: 0;*/
                /*    visibility: hidden;*/
                /*    clear: both;*/

                /*}*/

                .item {
                    width: 108px;
                    display: inline-block;
                    margin-right: 10px;

                    &:last-child {
                        margin-right: 0;
                    }

                    /*float: left;*/
                    /*margin-right: 2%;*/
                    /*margin-top: 2%;*/
                    /*&:nth-child(-n+3){*/
                    /*    margin-top: 0;*/
                    /*}*/

                    /*&:nth-child(3n) {*/
                    /*    margin-right: 0;*/
                    /*}*/

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

                        .count {
                            position: absolute;
                            top: 2px;
                            right: 4px;
                            color: #ffffff;
                            display: flex;
                            align-items: center;

                            i {
                                font-size: 14px;
                                margin-right: 5px;
                            }

                            span {
                                font-size: 11px;
                            }
                        }
                    }

                    .con {
                        font-size: 11px;
                        padding: 5px;
                        line-height: 1.5;

                        p {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }

        .song {
            width: 100%;
            overflow: hidden;

            h3 {
                font-size: 14px;
                padding: 8px 10px;
            }


            .wrap {
                box-sizing: border-box;
                width: 100%;
                text-align: center;
                padding: 0 10px;


                .item {
                    position: relative;
                    box-sizing: border-box;
                    padding: 5px 0;
                    display: flex;
                    align-items: center;

                    .pic {
                        position: relative;
                        width: 44px;
                        height: 44px;
                        margin-right: 5px;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 3px;
                        }
                    }

                    .icon {
                        i {
                            font-size: 18px;
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
