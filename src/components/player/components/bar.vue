<template>
    <div class="bar" ref="progressBar">
        <span class="current-time">{{currentTime}}</span>
        <van-slider step="0.1" active-color="#ffffff" inactive-color="#999" button-size=".12rem" :value="percent"
                    @change="progressChanged"/>
        <span class="all-time">{{allTime}}</span>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        props: {
            percent: {
                type: Number,
                default: 0
            },
            currentTime: String || Number,
            allTime: String || Number
        },
        created() {
        },
        methods: {

            progressChanged(val) {
                this.$emit('progressChanged', val / 100)
            },
        },
    }
</script>

<style scoped lang="less">

    .bar {
        height: 35px;
        display: flex;
        align-items: center;
        padding: 0 18px;

        .current-time, .all-time {
            font-size: 10px;
            color: #eeeeee;
        }

        .van-slider {
            flex: 1;
            margin: 0 8px;
        }
    }
</style>
