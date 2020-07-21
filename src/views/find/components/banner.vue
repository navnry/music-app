<template>
    <div class="banner">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="item in swiperList">
                <img class="banner-img" :src="item.pic" alt=""/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import api from '@/api'
    import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'

    export default {
        name: 'banner',
        components: {
            Swiper,
            SwiperSlide,
        },
        directives: {
            swiper: directive
        },
        data() {
            return {
                swiperList: [],
                swiperOptions: {
                    speed: 600,
                    loop: true,
                    spaceBetween: 24,
                    autoplay: {
                        delay: 500
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    },
                }
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
                    this.swiperList = res

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


        .swiper-container {
            padding: 0 12px;

            .swiper-slide {
                width: 100%;
                border-radius: 8px;
                overflow: hidden;

                img {
                    display: block;
                    width: 100%;

                }
            }
        }
    }
</style>
