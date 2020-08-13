<template>
    <div class="about">
        <div :style="{height: contentHeight}" class="pic-content">
            <van-list
                    :finished="finished"
                    :finished-text="finishedText"
                    v-model="loading"
                    :offset="10"
                    :immediate-check="false"
                    @load="getserviceList"
            >
                <van-row>
                    <van-col span="12" class="pic-box" v-for="item in serviceList" :key="item.id">
                        <div class="pic-item"><img :src="item.picUrl"></div>
                        <p>{{item.name}}</p>
                    </van-col>
                </van-row>
            </van-list>
        </div>
    </div>
</template>
<script>
    import api from "@/api"

    export default {
        data() {
            return {
                active: 0,
                typeList: [],
                serviceList: [],
                type: "",
                finishedText: "",
                finished: false,
                pageNum: 1,
                pageSize: 10,
                contentHeight: 0,
                loading: false,
                limit: 7
            };
        },
        mounted() {
            this.getOrderStyle();
            this.contentHeight = document.documentElement.clientHeight - 66 - 40 + "px";
        },
        methods: {
            async getOrderStyle() {
                let res = await api.recommendSheetFn();
                console.log(res);
                if (res.data.code === 200) {
                    this.typeList = res.data.result;
                    this.getTypeDate();
                }
            },
            getTypeDate() {

                // this.type = this.typeList[this.active].name;
                // this.serviceList = [];
                // this.finishedText = "";
                // this.finished = false;
                // this.getserviceList();
                this.pageNum = 1;
                this.limit = 7
                this.getserviceList();
            },
            async getserviceList() {
                let toast = this.$toast.loading({
                    mask: true,
                    message: "加载中..."
                });


                let res = await api.recommendSheetFn(this.limit);
                this.loading = false;
                toast.close();
                console.log(res);
                if (res.data.code === 200) {
                    let list = (res.data.result) || [];
                    // if (pageNum > 1) {
                    //     this.serviceList = [...this.serviceList, ...list];
                    // } else {
                    this.serviceList = list;
                    // }
                    // 如果当前页数 = 总页数，则已经没有数据
                    // if (res.data.result.pageNum === res.data.data.pages) {
                    //     this.finished = true;
                    //     this.finishedText = "- 没有更多了-";
                    // }
                    if(this.limit>140) {
                        this.finished = true;
                        this.finishedText = "- 没有更多了-";
                    }
                    // 如果总页数大于当前页码，页码+1
                    // if (res.data.data.pages > pageNum) {
                    this.limit += 7;
                    // }
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .pic-content {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        .pic-box {  padding: 0 10px;
            background-color: #fff;
            overflow: hidden;
            box-sizing: border-box;
            margin-bottom: 0.7rem;
            border-radius: 4px;


            .pic-item {
                height: 2rem;

                flex-direction: column;
                justify-content: center;
                overflow: hidden;

                img {
                    width: 100%;
                    height: auto;
                    border-radius: 4px;
                }
            }
        }
    }
</style>

