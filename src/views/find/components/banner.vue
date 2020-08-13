<template>
    <div class="banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in swiperList">
<!--                    <img class="banner-img" :src="item.pic" alt=""/>-->
                    <van-image :src="item.pic">
                        <template v-slot:loading></template>
                    </van-image>
                    <span :style="{backgroundColor:item.titleColor}">{{item.typeTitle}}</span>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        name: 'banner',
        data() {
            return {
                swiperList: [],
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        methods: {
            _getFindSwiper() {
                api.bannerSwiperFn().then(this.getFindSwiperSuc)
            },
            getFindSwiperSuc(res) {
                if (res.status === 200 && res.statusText === 'OK') {
                    res = res.data.banners
                    this.swiperList = res,
                        this.$nextTick(() => {
                            new Swiper(".banner .swiper-container", {
                                speed: 800,
                                loop: true,
                                spaceBetween: 24,
                                autoplay: {
                                    delay: 3000,
                                    disableOnInteraction:false
                                },
                                pagination: {
                                    el: '.banner .swiper-pagination',
                                    clickable: true,
                                },
                            })
                        })
                }
            }
        },
        mounted() {
            this._getFindSwiper()
        }
    }
</script>

<style scoped lang="less">
    .banner {


        /deep/ .swiper-container {
            padding: 0 10px;

            .swiper-slide {
                width: 100%;
                border-radius: 8px;
                overflow: hidden;
                position: relative;
                font-size: 0;

                img {
                    display: block;
                    width: 100%;
                    border-radius: 8px;
                }

                span {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    border-radius: 8px 0 0 0;
                    font-size: 10px;
                    color: #ffffff;
                    line-height: 1.8;
                    padding: 0 5px;
                }
            }
        }
    }
</style>
