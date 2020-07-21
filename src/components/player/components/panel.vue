<template>
    <div class="panel">
        <i class="iconfont" :class="[iconMode]" @click="changeMode"></i>
        <i class="iconfont icon-shangyiqu1" @click="prev"></i>
        <i class="iconfont" @click="play" :class="{'icon-bofang': playing, 'icon-zanting': !playing}"></i>
        <i class="iconfont icon-shangyiqu" @click="next"></i>
        <i class="iconfont icon-caidan" @click="showPlaylist"></i>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "panel",
        props: ['iconMode'],
        computed: {
            ...mapGetters(['playing']),
        },

        methods: {
            play() {
                this.$emit('play')
            },
            prev() {
                this.$emit('prev')
            },
            next() {
                this.$emit('next')
            },
            changeMode() {
                this.$emit('changeMode')
            },
            showPlaylist() {
                this.$emit('showPlaylist')
            }
        }
    }
</script>

<style scoped lang="less">
    .panel {
        display: flex;
        align-items: center;
        padding: 0 25px;

        i {
            flex: 1;
            text-align: center;
            font-size: 18px;

            &:nth-of-type(3) {
                font-size: 40px
            }
        }

        /*.panel-item {*/
        /*    flex: 1;*/
        /*    text-align: center;*/

        /*    &.playing {*/
        /*        i {*/
        /*            font-size: 40px;*/
        /*        }*/
        /*    }*/

        /*    i {*/
        /*        font-size: 18px;*/
        /*    }*/

        /*}*/
    }
</style>
