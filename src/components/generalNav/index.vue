<template>
    <nav class="phone-nav" ref="nav" :class="{height: height === 'all'}">
        <i class="phone iconzuojiantou" @click="returnPage"></i>
        <!-- slot 插槽将不同页面的标题信息显示 -->
        <slot></slot>
    </nav>
</template>

<script>
    export default {
        name: 'loginNav',
        props: {
            nav: {
                type: String,
                default: ''
            },
            height: {
                type: String,
                default: 'all'
            }
        },
        methods: {
            visible() {
                this.$refs.nav.style.visibility = 'visible'
            },
            hidden() {
                this.$refs.nav.style.visibility = 'hidden'
            },
            returnPage() {
                // 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步
                // 类似 window.history.go(n)。
                this.$emit('returnPage')
            }
        }
    }
</script>

<style lang="less" scoped>
    .phone-nav {
        display: flex;
        align-items: center;

        &.height {
            height: 1rem;
            line-height: 1rem;
        }

        .phone {
            font-size: 0.4rem;
            margin-right: .2rem;
        }
        .text{
            font-size: .3rem;
        }
    }
</style>
