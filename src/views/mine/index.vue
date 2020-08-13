<template>
    <div class="mine">
        <van-list
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad"
                :offset="10"
        >
            <van-cell class="mlist" v-for="item in itemList" :key="item.id">
                <div class="pic"><img :src="item.picUrl" alt=""></div>
                <div class="content">
                    <div class="name"> {{item.name}}</div>
                    <div class="desc">{{item.copywriter}}</div>
                </div>
            </van-cell>
        </van-list>

        <div class="no-data" v-if="!this.itemList">
            <!--            <img src="../assets/images/null.png" alt="暂无记录" class="img"/>-->
        </div>
    </div>
</template>

<script>
    import api from "@/api"

    export default {
        name: "mine",
        created() {
            //创建组件时，加载第1页数据
            this.getroadList();
        },

        data() {
            return {
                loading: false,
                finished: false,
                page: 1,//请求第几页
                pageSize: 10,//每页请求的数量
                total: 0,//总共的数据条数
                itemList: [],
            };
        },

        methods: {
            getroadList() {
                let params = {
                    page: this.page,
                    pageSize: this.pageSize
                };

                //this.$api.pay.schedule(params)是我自己封装的get请求接口

                api.recommendSheetFn(14).then(res => {
                    if (res.status === 200) {
                        console.log(res.data.result);

                        this.itemList = res.data.result
                        let rows = res.data.rows; //请求返回当页的列表
                        this.loading = false;
                        this.total = res.data.total;

                        if (rows == null || rows.length === 0) {
                            // 加载结束
                            this.finished = true;
                            return;
                        }

                        // 将新数据与老数据进行合并
                        this.itemList = this.itemList.concat(rows);

                        //如果列表数据条数>=总条数，不再触发滚动加载
                        if (this.itemList.length >= this.total) {
                            this.finished = true;
                        }
                    }
                })
            },

            //滚动加载时触发，list组件定义的方法
            onLoad() {
                this.page++;
                this.getroadList();
            }
        }
    };
</script>
<style scoped lang="less">
    .mlist {
        display: flex;
flex-wrap: nowrap;
        .pic {
            width: 2rem;
            height: 2rem;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .content {
            flex: 1;
        }
    }
</style>
