<!-- 歌单详情页 -->
<template>
    <div class="sheet">
        <div class="header" ref="header">
            <div class="back">
                <i class="iconfont icon-fanhui2" @click="goback"></i>
            </div>
            <div class="title">
                <span>{{sheetInfo.name}}</span>
            </div>
        </div>
        <div class="sheet-content">
            <div class="bgImg" ref="bgImg">
                <div class="mask"></div>
                <img :src="sheetInfo.coverImgUrl">
            </div>
            <div class="sheet-desc">
                <div class="wrap">
                    <div class="pic">
                        <van-image :src="sheetInfo.coverImgUrl">
                            <template v-slot:loading></template>
                        </van-image>
                    </div>
                    <div class="con">
                        <div class="name">{{sheetInfo.name}}</div>
                        <div class="user">
                            <!--                            <img :src="sheetInfo.creator.avatarUrl" alt="">-->
                            <!--                            <span>{{sheetInfo.creator.nickname}}</span>-->
                        </div>
                        <div class="desc">
                            <p>{{sheetInfo.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-layer" ref="layer">
            <div>播放全部（{{list.length}}首）</div>
        </div>

        <scroll
                class="song-list-container"
                ref="BScroll"
                :probeType="3"
                :listenScroll="true"
                @scroll="onScroll"
        >

            <div class="song-list">
                <div class="wrap">
                    <van-loading v-show="loaded" vertical>加载中...</van-loading>
                    <div class="item" v-for="(item,index) in list" @click="selectSong(item)"
                         :class="{disable:item.url==null}">
                        <div class="order">{{index+1}}</div>
                        <div class="con">
                            <div class="name"><p>{{ item.name}}</p></div>
                            <div class="singger">
                                <p>
                                    <span v-if="item.url==null"><i class="iconfont icon-VIP"></i></span>
                                    <!--                                    <span v-if="item.br>12800"><i class="iconfont icon-dujia"></i></span>-->
                                    {{item.singer}}-{{item.album}}</p>
                            </div>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {prefixStyle} from '@/utils/config'
    import api from '@/api'
    import scroll from '@/components/scroll'
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    const transform = prefixStyle('transform')
    const RESERVED_HEIGHT = 20
    export default {
        data() {
            return {
                id: 0,
                data: '',
                songs: [],
                scroll: Object,
                scrollY: 0,
                total: 0,
                sheetInfo: {},
                list: [],
                trackIds: [],
                loaded: true
            }
        },

        components: {
            scroll
        },
        mounted() {
            this.imageHeight = this.$refs.bgImg.clientHeight
            this.minTransalteY = -(this.imageHeight - RESERVED_HEIGHT)
            this._getRecommendSheetList()
        },
        methods: {
            goback() {
                this.$router.back(-1)
            },
            selectSong(item) {
                this.insertSong(item)
            },

            _getRecommendSheetList() {
                api.recommendSheetListFn(this.$route.query.id).then(res => {
                    let result = res.data.playlist
                    let sheetInfo = {
                        coverImgUrl: result.coverImgUrl,
                        playCount: result.playCount,
                        commentCount: result.commentCount,
                        shareCount: result.shareCount,
                        subscribedCount: result.subscribedCount,
                        name: result.name,
                        description: result.description,
                        creator: {
                            avatarUrl: result.creator.avatarUrl,
                            nickname: result.creator.nickname
                        },

                    }

                    let trackIds = res.data.playlist.trackIds.map(item => {
                        return item.id
                    })
                    this._getAllList(trackIds)
                    // console.log(sheetInfo);
                    this.sheetInfo = sheetInfo
                })
            },

            _singerName(arr) {
                let name = []
                name = arr.map(function (item) {
                    return item.name
                })
                return name.join('/')
            },
            _getSong(id) {
                return api.songUrlFn(id)
            },

            _getAllList(arr) {
                api.songDetailFn(arr.toString()).then(res => {
                    let songList = res.data.songs.map((item) => {
                        return {
                            id: item.id,
                            singer: this._singerName(item.ar),
                            name: item.name,
                            album: item.al.name,
                            image: item.al.picUrl,
                        }
                    })
                    let tmplist = res.data.songs.map(item => {
                        return this._getSong(item.id);
                    })
                    Promise.all(tmplist).then(res => {
                        console.log(res);
                        songList = songList.map((item, index) => {
                            item.url = res[index].data.data[0].url
                            item.payed = res[index].data.data[0].payed
                            item.br = res[index].data.data[0].br
                            return item
                        })
                        console.log(songList);
                        this.list = songList
                        this.$nextTick(() => {
                            this.loaded = false
                        })
                    })
                })
            },

            ...mapActions([
                'insertSong'
            ]),

            onScroll: function (pos) {
                this.scrollY = pos.y
            },
        },

        computed: {},

        watch: {
            scrollY(newVal) {
                // 向下滚动时scrollY>0,
                if (this.scrollY > 0) {
                    // 计算出一个背景图片的放大率,算法:用滚动的大小除以图片整个的高度表示
                    let scale = (this.scrollY / this.$refs.bgImg.offsetHeight).toFixed(2) * 1 + 1
                    this.$refs.bgImg.style[transform] = `scale(${scale})`
                }

                // 控制遮罩层平移的最大高度
                let headerHeight = this.$refs.header.clientHeight
                let translateY = Math.max(this.minTransalteY + headerHeight, newVal)
                // console.log(this.minTransalteY);
                this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
                // 当遮罩不再运动时,让背景图盖住多出的scroll内容,并且隐藏playAll按钮,将背景图大小调整为40高度
                if (translateY === this.minTransalteY) {
                    this.$refs.bgImg.style.zIndex = 2
                    // this.$refs.bgImg.style.height = RESERVED_HEIGHT + 'px'
                    this.$refs.bgImg.style.height = 0 + 'px'
                } else {
                    this.$refs.bgImg.style.zIndex = 0
                    this.$refs.bgImg.style.height = '6rem'
                }
            },

        }
    }
</script>
<style scoped lang="less">


    .sheet {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        background-color: #222;

        .header {
            position: absolute;
            display: flex;
            width: 100%;
            height: 1rem;
            top: 0;
            align-items: center;
            padding: 0 12px;
            z-index: 9;

            .back {
                i {
                    font-size: 14px;
                    color: #FFFFFF;
                }
            }

            .title {
                flex: 1;
                margin-right: 20px;
                padding: 0 20px;
                color: #FFFFFF;
                text-align: center;

                p {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .sheet-content {
            position: relative;
            z-index: 1;

            .bgImg {
                height: 6rem;
                overflow: hidden;
                position: absolute;
                transform-origin: top;

                .mask {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 1;
                }

                img {
                    width: 100%;
                    object-fit: cover;
                    filter: blur(20px);
                    transform: scale(1.3);

                }
            }

            .sheet-desc {
                position: relative;
                z-index: 2;

                .wrap {
                    padding: 60px 12px 0 12px;
                    display: flex;

                    .pic {
                        width: 120px;
                        height: 120px;
                        margin-right: 12px;
                        border-radius: 8px;
                        overflow: hidden;

                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                            border-radius: 8px;
                        }
                    }

                    .con {
                        color: #FFFFFF;
                        flex: 1;

                        .user {
                            display: flex;
                            align-items: center;
                            padding: 10px 0;

                            img {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                margin-right: 6px;
                            }

                            span {
                                flex: 1;
                                font-size: 12px;
                            }
                        }

                        .desc {
                            font-size: 12px;
                            line-height: 1.5;

                            p {
                                height: 3em;
                                overflow: hidden;
                            }
                        }
                    }
                }

            }
        }

        .bg-layer {
            position: absolute;
            top: 5.6rem;
            /*top: 42%;*/
            /*height: calc(100% - 1.1rem);*/
            height: 100%;
            background: #fff;
            width: 100%;
            border-radius: 20px 20px 0 0;
            overflow: hidden;
            z-index: 1;

            div {
                line-height: 50px;
                background-color: #ffffff;
                color: #444444;
                padding: 0 20px;
            }
        }


        .song-list-container {
            z-index: 1;
            position: absolute;
            width: 100%;
            height: 85%;
            bottom: 0;
            overflow: hidden;

            .song-list {
                .wrap {
                    padding: 220px 0 10px 0;

                    .item {
                        display: flex;
                        align-items: center;

                        &.disable {
                            pointer-events: none;

                            .order {
                                color: #cccccc;
                            }

                            .con {
                                .name {
                                    color: #cccccc;
                                }

                                .singger {
                                    color: #cccccc;
                                }
                            }
                        }

                        .order {
                            width: 30px;
                            text-align: center;
                            font-size: 10px;
                            color: #666666;
                        }

                        .con {
                            width: 80%;
                            padding: 8px 0;

                            .name {
                                font-size: 14px;
                                color: #555555;
                            }

                            .singger {
                                font-size: 11px;
                                color: #888888;
                                width: 80%;

                            }

                            p {
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                display: flex;
                                align-items: center;

                                span {
                                    color: red;

                                    i {
                                        font-size: 19px;
                                        margin-right: 2px;
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }


    }


</style>
