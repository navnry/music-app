<template>
    <div class="mvideo">
        <p>第{{day}}天</p>
        <p>需要￥{{num}}</p>
        <p>总共￥{{result}}</p>
    </div>
</template>

<script>
    export default {
        name: "mvideo",
        data() {
            return {
                day: 1,
                num: '',
                result: '',
                list: []
            }
        },
        mounted() {
            this._setCount()
        },
        methods: {
            _setCount() {
                var count = 0
                var ned = 0
                setInterval(() => {
                    count++
                    if (count > 100) {
                        return
                    }
                    ned += 1
                    this.day = count
                    this.num = ned
                    if (ned > 10000) {
                        this.num = (ned / 10000).toFixed(1) + "万"
                    }
                    if (ned > 100000000) {
                        this.num = (ned / 100000000).toFixed(1) + "亿"
                    }
                    this.list = this.list.concat(ned)
                    this._setResult(this.list)
                }, 100)
            },
            _setResult(value) {
                var sum = value.reduce((prev, cur) => {
                    return prev + cur
                });
                if (sum > 100000000) {
                    sum = (sum / 100000000).toFixed(1) + "亿"
                }
                if (sum > 10000) {
                    sum = (sum / 10000).toFixed(1) + "万"
                }
                this.result = sum

                return sum;
            }

        }
    }
</script>

<style scoped>

</style>