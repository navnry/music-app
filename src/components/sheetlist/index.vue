<template>
    <div class="sheet">
        <div class="bar">
            <div class="back">
                <i class="iconfont icon-fanhui2" @click="goback"></i>
            </div>
            <div class="title">
                <span>{{sheetInfo.name}}</span>
            </div>
        </div>
        <div class="sheet-top">
            <div class="sheet-top-container">
                <div class="sheet-top-bg" :style="{'backgroundImage': 'url(' + sheetInfo.coverImgUrl + ')'}"></div>
                <div class="wrap">
                    <div class="thumb"><img :src="sheetInfo.coverImgUrl" alt=""></div>
                </div>
            </div>
        </div>
        <scroll>
            <div class="sheetlist">
                <div class="wrap">
                    <div class="item" v-for="(item,index) in list" @click="selectSong(item)">
                        <div class="order">{{index+1}}</div>
                        <div class="con">
                            <div class="name"><p>{{ item.name}}</p></div>
                            <div class="singger"><p>{{item.singer}}-{{item.album}}</p></div>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>

</template>

<script>
    import api from '@/api'
    import scroll from '@/components/scroll'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {songDetal} from "../../api/config";

    export default {
        name: "sheetlist",
        data() {
            return {
                id: 0,
                total: 0,
                sheetInfo: {},
                list: [],
                trackIds: []
            }
        },
        components: {
            scroll
        },
        created() {
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

            _getAllList(arr) {
                api.songDetailFn(arr.toString()).then(res => {
                    // console.log(res.data.songs);
                    let tmplist = res.data.songs.map((item) => {
                        return {
                            id: item.id,
                            singer: this._singerName(item.ar),
                            name: item.name,
                            album: item.al.name,
                            image: item.al.picUrl,
                        }
                    })
                    this.list = tmplist
                })
            },

            ...mapActions([
                'insertSong'
            ])
        }
    }
</script>

<style scoped lang="less">
    .sheet {
        /*padding-top: 200px;*/
    }

    .bar {
        position: absolute;
        width: 100%;
        display: flex;
        height: 1rem;
        top: 0;

        align-items: center;
        padding: 0 12px;
        background-color: rgba(0, 0, 0, 0);
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

    .sheet-top {
        /*position: fixed;*/
        position: relative;
        width: 100%;
        z-index: 1;
        overflow: hidden;
        top: 0;
        padding-top: 1.2rem;

        .sheet-top-container {
            position: relative;
            height: 200px;
        }

        .sheet-top-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
            transition-duration: .5s;
            filter: blur(20px);
            transform: scale(1.8);
            z-index: -1;


            &::before {
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .5);
            }
        }

        .wrap {
            display: flex;
            position: relative;
            padding: 12px;

            .thumb {
                width: 2.4rem;

                img {
                    display: block;
                    width: 100%;
                    border-radius: 6px;
                }
            }
        }
    }


    .sheetlist {
        /*background-color: #ffffff;*/
        /*position: relative;*/
        /*width: 100%;*/
        /*z-index: 2;*/
        /*top: 180px;*/
        /*border-radius: 20px 20px 0 0;*/
        /*overflow-x: hidden;*/
        /*overflow-y: scroll;*/
        /*padding: 10px;*/
        position: absolute;
        width: 100%;

        .wrap {


            .item {
                display: flex;
                align-items: center;


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
                        font-size: 12px;
                        color: #888888;
                        width: 80%;

                    }

                    p {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
</style>
