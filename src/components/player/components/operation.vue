<template>
    <div class="operation">
        <div class="wrap">
            <div class="item"><i class="iconfont icon-xihuan-kongpt"></i></div>
            <div class="item"><i class="iconfont icon-xiazaipt" @click="downLoad"></i></div>
            <div class="item"><i class="iconfont icon-jingyunyinxiaopt"></i></div>
            <div class="item" @click="showComment"><i class="iconfont icon-pinglunpt" ></i><span class="total">{{total}}</span></div>
            <div class="item"><i class="iconfont icon-xinxipt"></i></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "operation",
        props: {
            total: String
        },
        methods: {
            downLoad() {
                this.$emit('downLoad')
            },
            showComment(){
                this.$emit('showComment')
            }
        }
    }
</script>

<style scoped lang="less">
    .operation {
        padding: 5px 0;

        .wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 22px;

            .item {
                position: relative;
                flex: 1;
                text-align: center;
                padding: 3px 0;

                i {
                    font-size: 20px;
                }

                .total {
                    position: absolute;
                    width: 20px;
                    font-size: 9px;
                    color: #eeeeee;
                    right: 10px;
                    top: 0;
                }
            }
        }
    }

</style>
