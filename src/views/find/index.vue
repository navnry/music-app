<template>

    <div class="find" ref="recommend">
        <scroll @pulldown="refresh" :pulldown="true">
            <div class="wrap">
                <Banner></Banner>
                <Sheet></Sheet>
                <div class="song">
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
                </div>
            </div>
        </scroll>
    </div>

</template>

<script>
    // import Scroll from '@/components/scroll'

    import scroll from '@/components/scroll'
    import api from '@/api'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import Banner from './components/banner'
    import Sheet from './components/sheet'

    export default {
        name: "find",
        components: {
            scroll,
            Banner,
            Sheet
        },
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

            // console.log(this.$store);
        },
        mounted() {
        },
        computed: {
            ...mapGetters([
                'playing',
            ])
        },
        methods: {
            refresh(){
                console.log(1);
            },
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
            ...mapMutations({
                setMuiscList: 'SET_MUSIC_LIST',
                setFullScreen: 'SET_FULL_SCREEN'
            }),
            ...mapActions([
                'insertSong'
            ])
        },

    }
</script>

<style lang="less" scoped>


    .find {
        position: fixed;
        width: 100%;


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
