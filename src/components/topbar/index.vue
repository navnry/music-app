<template>
    <div class="toptab">
        <div class="search">
            <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词"/>
        </div>
        <div class="circle" @click.stop="open">
            <van-circle size=".64rem" color="#C20C0C" :value="this.$store.state.playProgress">
                <img :class="{'pause': !playing}" :src="this.$store.state.currentThumb">
            </van-circle>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: "toptab",
        data(){
            return{
                searchValue:''
            }
        },
        computed: {
            ...mapGetters([
                'playing',
            ])
        },
        methods:{
            open() {
                console.log(1);
                this.setFullScreen(true)
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            }),
        }
    }
</script>

<style scoped lang="less">
    .toptab {
        position: fixed;
        width: 100%;
        top: 0;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        z-index: 9;

        .search {
            flex: 1;
            /*margin-right: 10px;*/
        }

        .circle {
            margin-right: 12px;
            width: 32px;
            height: 32px;

            .van-circle {
                padding: 3px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    animation: rotate 10s linear infinite;

                    &.pause {
                        animation-play-state: paused;
                    }
                }
            }
        }
    }

</style>
