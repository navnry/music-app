<template>
    <div class="sheet">
        <h3>推荐歌单</h3>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" ref="sheetitem" v-for="item in recommendSheet" @click="skip(item.id)">
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
        <!--        <div class="wrap" ref="sheetwrap">-->
        <!--            <div class="item" ref="sheetitem" v-for="item in recommendSheet" @click="skip(item.id)">-->
        <!--                <div class="pic">-->
        <!--                    <img :src="item.picUrl" v-lazy="item.picUrl" alt="">-->
        <!--                    <div class="count">-->
        <!--                        <i class="iconfont icon-zanting"></i>-->
        <!--                        <span>{{formatCount(item.playCount)}}</span>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <div class="con">-->
        <!--                    <p>{{item.name}}</p>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import scroll from '@/components/scroll'
    import Swiper from 'swiper'
    // import 'swiper/swiper-bundle.min.css'
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
                api.recommendSheetFn().then(res => {
                    if (res.status === 200) {
                        this.recommendSheet = res.data.result
                        this.$nextTick(() => {
                            new Swiper(".sheet .swiper-container",{
                                slidesPerView: 3.1,
                                spaceBetween: 10,
                                freeMode:true
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

<style lang="less">
    .sheet {
        padding: 10px 0;

        h3 {
            font-size: 14px;
            padding: 8px 10px;
        }

        .swiper-container {
            padding: 0 10px;
            .swiper-slide {
                width: 108px;
                display: inline-block;
                /*margin-right: 10px;*/

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
    }
</style>
