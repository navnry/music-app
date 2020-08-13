<template>
    <div class="sheet">
        <h3>推荐歌单</h3>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" ref="sheetitem" v-for="item in recommendSheet" @click="skip(item.id)">
                    <div class="pic">
<!--                        <img v-lazy="item.picUrl" alt="">-->
                        <van-image :src="item.picUrl">
                            <template v-slot:loading></template>
                        </van-image>
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
    </div>
</template>

<script>
    import scroll from '@/components/scroll'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import api from '@/api'

    export default {
        name: "sheet",
        data() {
            return {
                recommendSheet: []
            }
        },
        components: {
            scroll
        },
        mounted() {
            this._getRecommendSheet()

        },
        methods: {
            skip(id) {
                this.$router.push({
                    path: '/sheetlist',
                    query: {
                        id: id
                    }
                })
            },

            _getRecommendSheet() {
                api.recommendSheetFn(14).then(res => {
                    if (res.status === 200) {
                        this.recommendSheet = res.data.result
                        this.$nextTick(() => {
                            new Swiper(".sheet .swiper-container", {
                                slidesPerView: 3.1,
                                spaceBetween: 10,
                                freeMode: true
                            })
                        })
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

        }
    }
</script>

<style scoped lang="less">
    .sheet {
        padding: 10px 0;

        h3 {
            font-size: 14px;
            padding: 8px 10px;
        }

       /deep/ .swiper-container {
            padding: 0 10px;

            .swiper-slide {
                width: 108px;
                display: inline-block;
                /*margin-right: 10px;*/

                .pic {
                    width: 100%;
                    /*padding-bottom: 100%;*/
                    position: relative;
                    border-radius: 8px;
                    overflow: hidden;
                    font-size: 0;

                    img {
                        /*position: absolute;*/
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
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

        .wrap{
            padding: 0 12px;
            display: flex;
            flex-wrap: wrap;
            /*justify-content: stretch;*/

            .item{
                width: 32%;
                margin-right: 2%;
                display: flex;
                flex-direction: column;
                /*-webkit-box-orient: vertical;*/
                /*-webkit-box-direction: normal;*/
                /*-webkit-flex-direction: column;*/
                /*-ms-flex-direction: column;*/

                &:nth-child(3n){
                    margin-right: 0;
                }

                .pic{
                    img{
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
