<template>
    <div class="lyc">
        <div class="thumb">
            <div class="thumb-wrap">
                <img :src="imgUrl" class="image" :class="{'pause': !playing}">
            </div>
        </div>
        <div class="content">
            <div class="lyc-wrap">
                <div class="currentLyric" v-if="!noLyric">
                    <p>{{lyric}}</p>
                </div>
                <div v-if="noLyric"><p>{{noLyricText}}</p></div>
            </div>
        </div>
        <!--
            <transition name="middleR">
                <scroll class="middle-r" ref="lyricList" v-show="currentShow === 'lyric'"
                        :data="currentLyric && currentLyric.lines">
                    <div class="lyric-wrapper">
                        <div class="currentLyric" v-if="currentLyric">
                            <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}"
                               v-for="(line, index) in currentLyric.lines" :key="line.key">
                                {{line.txt}}
                            </p>
                        </div>
                        <p class="no-lyric" v-if="currentLyric === null">{{upDatecurrentLyric}}</p>
                    </div>
                </scroll>
            </transition>
            -->
    </div>
</template>

<script>
    import Scroll from '@/components/scroll'
    import {mapGetters} from 'vuex'

    export default {
        name: 'lyc',
        components: {
            Scroll
        },
        props: {
            imgUrl: String,
            lineNum: Number,
            lyric: Object,
            noLyricText: String,
            noLyric: Boolean
        },
        computed: {
            ...mapGetters(['playing']),
        },
        mounted() {
            console.log(this.currentSong);
        }
    }
</script>

<style scoped lang="less">
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .lyc {
        width: 100%;
        height: 100%;
    }

    .thumb {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;


        .thumb-wrap {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;

            .image {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: 15px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                animation: rotate 20s linear infinite;

                &.pause {
                    animation-play-state: paused;
                }

            }
        }
    }
</style>
