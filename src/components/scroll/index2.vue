<template>
    <div class="scroll" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        componentName: 'scroll',
        components: {},
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullingUp: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pullingDown: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScrollStart: {
                type: Boolean,
                default: false
            },
            /**
             * 当数据更新后，刷新scroll的延时。
             */
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            // 保证在DOM渲染完毕后初始化better-scroll
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                // better-scroll的初始化
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    scrollX: this.scrollX
                })

                // 是否派发滚动事件
                if (this.listenScroll) {
                    let me = this
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }


                // 是否派发顶部下拉事件，用于下拉刷新
                if (this.pullingDown) {
                    this.scroll.on('touchEnd', (pos) => {
                        // 下拉动作
                        if (pos.y > 50) {
                            this.$emit('pullingDown')
                        }
                    })
                }
                // 是否派发滚动到底部事件，用于上拉加载
                if (this.pullingUp) {
                    this.scroll.on('scrollEnd', () => {
                        // 滚动到底部
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('pullingUp')
                        }
                    })
                }
                // 是否派发列表滚动开始的事件
                if (this.beforeScrollStart) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScrollStart')
                    })
                }
            },
            disable() {
                // 代理better-scroll的disable方法
                this.scroll && this.scroll.disable()
            },
            enable() {
                // 代理better-scroll的enable方法
                this.scroll && this.scroll.enable()
            },
            refresh() {
                // 代理better-scroll的refresh方法
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                // 代理better-scroll的scrollTo方法
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                // 代理better-scroll的scrollToElement方法
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style scoped lang="less">
    .scroll {
        width: 100%;
        height: 100%;
        /*overflow: scroll;*/
        position: relative;

    }

    .list-wrapper {
        width: 100%;
        min-height: 101%;
    }

    .pulldown-wrapper {
        width: 100%;
        height: 50px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
        top: -50px;
        z-index: 100;
    }

    .pullup-wrapper {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
