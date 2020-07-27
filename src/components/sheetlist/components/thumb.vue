<template>
    <div class="thumb" @scroll="scrollList">

    </div>
</template>

<script>
    import globalNav from '@/components/generalNav'

    export default {
        name: "thumb",
        components: {
            globalNav
        },
       props:{
           albumTitle:''
       },
        /**
         * 这里使用 data 把 props 接收的值进行存储，因为 vue 不允许子组件直接修改父组件传过来的值
         */
        data() {
            return {
                iTitle: this.title,
                iAlbumTitle: this.albumTitle,
                listFixed: false,
                top: '0.5rem',
                isSubInItem: false,
                subscribedCountItem: 0
            }
        },
        methods: {

            /**
             * 收藏歌单
             */
            addPlaylist() {
                // const id = this.albumId || this.dishId || this.idxId
                // api.addOrDeletePlaylistFn(1, id)
                //     .then(res => {
                //         const data = res.data
                //         if (data.code === 200) {
                //             this.isSubInItem = true
                //             ++this.subscribedCountItem
                //         }
                //     })
            },
            /**
             * 取消收藏歌单
             */
            deletePlaylist() {
                const id = this.albumId || this.dishId || this.idxId
                // api.addOrDeletePlaylistFn(2, id)
                //     .then(res => {
                //         const data = res.data
                //         if (data.code === 200) {
                //             this.isSubInItem = false
                //             --this.subscribedCountItem
                //         }
                //     })
            },
            /**
             * 播放全部，向父组件传递事件
             */
            beginAudio() {
                // this.$emit('startPlayAll')
            },
            /**
             * 去评论页面
             * 通过传不同的params的属性来判断资源是歌单还是专辑
             */
            goComments() {
                // const playlistId = this.albumId ? this.albumId : this.idxComId
                // const albumId = this.dishId
                // const imgUrl = this.imgUrl
                // const title = this.albumTitle
                // const author = this.author
                // this.$router.push({name: 'comments', params: {playlistId, albumId, imgUrl, title, author}})
            },
            /**
             * 返回上一页
             */
            returnPage() {
                this.$router.go(-1)
            },
            /**
             * 定义页面滚动事件，
             * 这里需要添加在滚动过程中样式的变化
             */
            scrollList(e) {
                // 获取到 top 值
                let top = this.$el.scrollTop
                // 当当前组件不是歌单组件时，就是每日推荐页面
                if (!this.isAlbum) {
                    if (top >= 148) {
                        this.listFixed = true
                        this.top = '1.3rem'
                    } else {
                        this.listFixed = false
                        this.top = '0.5rem'
                    }
                } else {
                    // 当是歌单组件时，当页面滚动到一定位置的时候顶部的标题会变
                    if (top >= 148) {
                        // 这里使用data存下了props的值进行修改，子组件不能直接修改props传过来的值
                        this.iTitle = this.albumTitle
                    } else {
                        this.iTitle = this.title
                    }
                    // 当 top 到了 250 的时候会改变标题行的是否固定样式
                    if (top >= 250) {
                        this.listFixed = true
                        this.top = '1.3rem'
                    } else {
                        this.listFixed = false
                        this.top = '0.5rem'
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">

    .topFixed {
        position: fixed;
        width: 100%;
        height: 1rem;
        background-color: #ee5253;
        z-index: 9;
    }

    .fixed {
        /*top: 0;*/
    }

    .listFixed {
        top: 1rem;
    }

    .wrapper {
        height: 100vh;
        position: relative;
        overflow: scroll;
        // 组件的title
        .title {
            font-size: 0.3rem;
            height: 1rem;
            line-height: 1rem;
            border-radius: 1rem 1rem 0 0;
            background-color: #fff;

            .count {
                color: #999;
            }

            .collection {
                font-size: smaller;
                margin-top: 3px;
                height: 0.7rem;
                line-height: 0.7rem;
                border-radius: 0.4rem;
                color: #999;

                &.bg {
                    color: #fff;
                }
            }
        }

        .container-top {
            width: 100%;
            color: #fff;
            /*background-color: #ee5253;*/
            position: relative;
            overflow: hidden;

            .top-bg {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                -webkit-filter: blur(20px);
                filter: blur(20px);
                -webkit-transform: scale(1.5);
                -ms-transform: scale(1.5);
                transform: scale(1.5);
                /*z-index: -1;*/

                &::before {
                    position: absolute;
                    content: "";
                    height: 100%;
                    width: 100%;
                    background: rgba(0, 0, 0, .3);
                }

            }

            .date {
                padding-top: 1.5rem;

                .day {
                    font-size: 0.7rem;
                }

                .month {
                    font-size: 0.4rem;
                    color: #c8d6e5;

                    &::before {
                        content: "/";
                    }
                }
            }

            .info {
                margin-top: 0.7rem;
            }

            .text {
                font-size: 0.3rem;
                /*vertical-align: 5px;*/
                width: 8rem;
            }

            .album-info {
                padding-top: 1.5rem;
                position: relative;

                .info-top {
                    height: 3rem;
                    overflow: hidden;

                    .img-info {
                        @size: 2.6rem;
                        height: 0;
                        position: relative;
                        overflow: hidden;

                        img {
                        }

                        .play-count {
                            position: absolute;
                            top: 0.1rem;
                            right: 0.1rem;

                            .bofang {
                                font-size: 0.24rem;
                            }
                        }
                    }

                    .info-con {
                        width: 4rem;
                        height: 2.6rem;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;

                        .album-title {
                            font-size: 0.3rem;
                            line-height: 1.5;
                        }

                        .creator {
                            height: 1rem;
                            display: flex;
                            align-items: center;

                            .img-info {
                                @size: 0.46rem;
                                height: 0;
                                margin-right: 8px;
                                border-radius: 50%;
                                overflow: hidden;

                                img {
                                }
                            }
                        }

                        .desc-wrapper {
                            display: flex;
                            align-items: center;
                            color: #ffffff;
                            font-size: .24rem;


                            .desc {
                                width: 3rem;
                            }

                            .date-song {
                                font-size: .24rem;
                            }
                        }
                    }
                }

                .icons {
                    margin-top: 8px;
                    width: 100%;

                    .comments {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;

                        .date-song {
                            font-size: 0.4rem;
                            margin-bottom: 5px;
                        }
                    }
                }
            }
        }

        .list-info {
            width: 100%;
            box-sizing: border-box;
            padding: 0.1rem 0.23rem;
            background-color: #fff;
            transform: translate3d(0, -0.5rem, 0);
        }
    }

    .authorName {
        display: flex;
        font-size: .24rem;
        align-items: center;

        .authorNameCon {
            max-width: 2.2rem;
            margin-right: .1rem;
        }

        .date-song {
            font-size: .24rem;
        }

    }
</style>
