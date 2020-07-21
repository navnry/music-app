<template>
    <div class="sheetlist">
        <div class="wrap">
            <div class="item" v-for="item in list" @click="selectSong(item)">
                <div class="order"></div>
                <div class="con">
                    <div class="name"><p>{{ item.name}}</p></div>
                    <div class="singger"><p>{{item.singer}}-{{item.album}}</p></div>
                </div>
                <div class="icon"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        name: "sheetlist",
        data() {
            return {
                id: 0,
                list: []
            }
        },
        created() {
            this._getRecommendSheetList()
        },
        methods: {
            selectSong(item) {
                this.insertSong(item)
            },
            _singerName(arr) {
                let name = []
                name = arr.map(function (item) {
                    return item.name
                })
                return name.join('/')
            },
            _getRecommendSheetList() {
                api.recommendSheetListFn(this.$route.query.id).then(res => {
                    // this.list = res.data.playlist.tracks
                    console.log(res.data.playlist.tracks);
                    let tmplist = res.data.playlist.tracks.map((item) => {
                        return {
                            id: item.id,
                            singer: item.ar[0].name,
                            name: item.name,
                            album: item.al.name,
                            image: item.al.picUrl
                        }
                    })
                    console.log(tmplist);
                    this.list = tmplist
                })
            },
            ...mapActions([
                'insertSong'
            ])
        }
    }
</script>

<style scoped lang="less">
    .sheetlist {
        .wrap {
            padding: 0 10px;

            .item {
                display: flex;
                align-items: center;
                padding: 5px 0;

                .con {
                    .name {
                        font-size: 14px;
                        color: #555555;
                    }

                    .singger {
                        font-size: 12px;
                        color: #888888;
                    }
                }
            }
        }
    }
</style>
