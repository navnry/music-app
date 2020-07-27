<template>
    <div class="mine">
        <m-scroll :data="recommendSheet"
                  :pullingDown="pullingDown"
                  @pullingDown="loadData"
                  :pullingUp="pullingUp"
                  @pullingUp="pullingData"
        >
            <ul class="content">
                <li v-for="item in recommendSheet">
                    <img :src="item.picUrl" alt="">
                    <p> {{item.name}}</p>
                </li>
            </ul>
            <div class="loading-wrapper"></div>
        </m-scroll>
    </div>
</template>
<script>
    import scroll from '@/components/scroll/index2'
    import api from '@/api'
    import {Toast} from 'vant'

    export default {
        components: {
            'm-scroll': scroll
        },
        data() {
            return {
                recommendSheet: [],
                pullingDown: true,
                pullingUp: true,
                count: 0,
                isLoading: false,
                limit: 7
            }
        },
        created() {
            // this.loadData()
        },
        mounted() {
            this._getRecommendSheet(this.limit)
        },
        methods: {
            loadData() {
                // console.log("a");

            },
            pullingData() {
                this.limit += 7
                Toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: '加载中',
                })
                setTimeout(() => {
                    this._getRecommendSheet(this.limit)
                    Toast.clear();
                }, 2000)
            },
            _getRecommendSheet(limit) {
                api.recommendSheetFn(limit).then(res => {
                    if (res.status === 200) {
                        this.recommendSheet = res.data.result
                        console.log(this.recommendSheet);
                    }
                })
            },

        }
    }
</script>
<style scoped lang="less">
    ul {
        white-space: nowrap;
        overflow: auto;
    }

    li {
        /*display: inline-block;*/
        font-size: 12px;
        /*line-height: 3;*/
        /*text-align: center;*/
        /*width: 100px;*/
        height: 100px;
        /*text-align: center;*/
        /*line-height: 100px;*/
        display: flex;
        align-items: center;
        padding: 0 12px;

        &:nth-child(1n) {
            background-color: #aaa;
        }

        &:nth-child(2n) {
            background-color: #bbb;
        }

        &:nth-child(3n) {
            background-color: #ccc;
        }

        img {
            width: 50px;
            height: 50px;
            display: block;
            margin-right: 10px;
        }

        p {
            flex: 1;
        }
    }
</style>
