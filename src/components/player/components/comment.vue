<template>
    <transition name="van-slide-right">
        <div class="comment" v-show="commentShow">
            <div class="top van-hairline--bottom">
                <div class="back" @click="back"><i class="iconfont icon-fanhuipt"></i></div>
                <div class="title"><p>{{songname}}</p></div>
            </div>
            <div class="content">
                <scroll>
                    <div class="wrap">
                        <h3>热门评论</h3>
                        <van-skeleton title avatar :loading="loading" :row="3">
                            <div class="item" v-for="item in commentData.hotComments">
                                <div class="portrait"><img :src="item.user.avatarUrl" alt=""></div>
                                <div class="con van-hairline--top">
                                    <div class="info">
                                        <div class="user">
                                            <div class="name"><p>{{item.user.nickname}}</p></div>
                                            <div class="time"><p>{{dateDiff(item.time)}}</p></div>
                                        </div>
                                        <div class="likedCount">
                                            <i class="iconfont icon-zan1"></i>
                                            <p>{{item.likedCount}}</p>
                                        </div>
                                    </div>

                                    <div class="desc"><p v-html="item.content"></p></div>
                                </div>
                            </div>
                        </van-skeleton>

                        <h3>最新评论</h3>
                        <van-skeleton title avatar :loading="loading" :row="3">
                            <div class="item" v-for="item in commentData.comments">
                                <div class="portrait"><img :src="item.user.avatarUrl" alt=""></div>
                                <div class="con van-hairline--top">
                                    <div class="info">
                                        <div class="user">
                                            <div class="name"><p>{{item.user.nickname}}</p></div>
                                            <div class="time"><p>{{dateDiff(item.time)}}</p></div>
                                        </div>
                                        <div class="likedCount">
                                            <i class="iconfont icon-zan1"></i>
                                            <p>{{item.likedCount}}</p>
                                        </div>
                                    </div>
                                    <div class="desc"><p>{{item.content}}</p></div>
                                </div>
                            </div>
                        </van-skeleton>
                    </div>
                </scroll>
            </div>
        </div>
    </transition>
</template>

<script>
    import scroll from "@/components/scroll"

    export default {
        name: "comment",
        data() {
            return {
                commentShow: false,
                loading: true
            }
        },
        components: {
            scroll
        },
        props: {
            commentData: Object,
            songname: String
        },
        created() {
            setTimeout(() => {
                this.loading = false;
            }, 2000)
        },
        mounted() {

        },
        methods: {
            show() {
                this.commentShow = true
            },
            back() {
                this.commentShow = false
            },


            /**
             * 时间处理函数
             * @param timestamp
             * @returns {string}
             */
            dateDiff(timestamp) {
                var arrTimestamp = (timestamp + '').split('');
                for (var start = 0; start < 13; start++) {
                    if (!arrTimestamp[start]) {
                        arrTimestamp[start] = '0';
                    }
                }
                timestamp = arrTimestamp.join('') * 1;

                var minute = 1000 * 60;
                var hour = minute * 60;
                var day = hour * 24;
                var halfamonth = day * 15;
                var month = day * 30;
                var now = new Date().getTime();
                var diffValue = now - timestamp;

                // 如果本地时间反而小于变量时间
                if (diffValue < 0) {
                    return '不久前';
                }

                // 计算差异时间的量级
                var monthC = diffValue / month;
                var weekC = diffValue / (7 * day);
                var dayC = diffValue / day;
                var hourC = diffValue / hour;
                var minC = diffValue / minute;

                // 数值补0方法
                var zero = function (value) {
                    if (value < 10) {
                        return '0' + value;
                    }
                    return value;
                };

                // 使用
                if (monthC > 12) {
                    // 超过1年，直接显示年月日
                    return (function () {
                        var date = new Date(timestamp);
                        return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
                    })();
                } else if (dayC >= 3) {
                    return (function () {
                        var date = new Date(timestamp);
                        return zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
                    })();
                } else if (dayC >= 1) {
                    return parseInt(dayC) + "天前";
                } else if (hourC >= 1) {
                    return parseInt(hourC) + "小时前";
                } else if (minC >= 1) {
                    return parseInt(minC) + "分钟前";
                }
                return '刚刚';
            }
        }
    }
</script>

<style scoped lang="less">
    .comment {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: #ffffff;


        .top {
            position: absolute;
            width: 100%;
            height: 50px;
            display: flex;
            align-content: center;
            line-height: 50px;
            padding: 0 12px;
            background-color: #ffffff;
            top: 0;

            .title {
                flex: 1;
                text-align: center;
                padding-right: 25px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .content {
            height: calc(100% - 1rem);
            position: relative;
            top: 1rem;
            overflow: hidden;

            p {
            }
        }

        h3 {
            font-size: 14px;
            padding: 20px 0 10px;
        }

        .wrap {
            padding: 0 12px;


            .item {
                display: flex;


                .portrait {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;
                    margin-top: 10px;

                    img {
                        display: block;
                        width: 100%;
                        border-radius: 50%;
                    }
                }

                .con {
                    flex: 1;
                    padding: 10px 0 15px;

                    .info {
                        display: flex;
                        align-items: center;

                        .user {
                            flex: 1;

                            .name {
                                font-size: 12px;
                            }

                            .time {
                                font-size: 10px;
                                color: #999999;
                            }
                        }

                        .likedCount {
                            display: flex;
                            align-content: center;
                            font-size: 10px;
                            color: #999999;

                            i {
                                font-size: 10px;
                                margin-right: 2px;
                            }
                        }

                    }

                    .desc {
                        font-size: 12px;
                        color: #444444;
                        margin-top: 5px;

                        p {
                            white-space: pre-line;
                            line-height: 1.5;
                            color: #666666;
                        }
                    }
                }
            }
        }
    }
</style>
