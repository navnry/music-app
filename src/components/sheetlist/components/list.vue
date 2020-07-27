<template>
    <div class="list">
        <div class="list-item" @click="startSong">
            <div class="index"></div>
            <div class="song-info">
                <p class="song-name"><span>{{songName}}</span></p>
                <p class="song-art" v-if="type==='songList'"></p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: '',
        props: {
            songName: {
                type: String
            },
            artists: {
                type: String
            },
            albumName: {
                type: String
            },
            alia: {
                type: String
            },
            imgUrl: {
                type: String
            },
            num: {
                type: Number
            },
            type: {
                type: String,
                default: 'songList'
            },
            itemId: {
                type: Number
            },
            createTime: {
                type: Number
            },
            listenerCount: {
                type: Number
            },
            duration: {
                type: Number
            },
            nowSong: {
                type: Boolean,
                default: false
            },
            twoLine: {
                type: Boolean
            },
            keywords: {
                type: String
            }
        },
        methods: {
            startSong() {
                // this.$emit('beginSong')
            },
            showSlider(id) {
                // this.$emit('showSlider', id)
            }
        }
    }
</script>

<style lang='less' scoped>

    .list-item {
        align-items: center;
        height: 1rem;

        .index {
            color: #999;
        }

        .yinliang {
        }

        .img-info {
            width: 0.7rem;
            height: 0;
            padding-bottom: 0.7rem;
            margin-right: 0.2rem;
            position: relative;

            img {
                border-radius: 0.1rem;
                width: 0.7rem;
                height: 0.7rem;
            }

            .yinliang {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
            }
        }

        .song-info {
            display: flex;
            flex-direction: column;

            .song-name {
                width: 75vw;
                max-height: 0.4rem;
                line-height: 0.4rem;
                font-size: .28rem;

                .alia {
                    color: #7c7b7d;
                }

                &.twoLine {
                    max-height: 0.8rem;
                    white-space: normal;
                }
            }

            .song-art {
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.2rem;
                color: #dacdcd;
                width: 75vw;

                .artist {
                    &::after {
                        content: "/";
                    }

                    &:last-child::after {
                        content: "";
                    }
                }

                .album-name {
                    &::before {
                        content: "-";
                    }
                }
            }

            .dj-info {
                font-size: 0.2rem;
                line-height: 1.5;
                color: #ccc;

                .result {
                    font-size: 0.2rem;
                }

                .data,
                .count {
                    margin-right: 0.2rem;
                }
            }
        }

        .icon {
            color: #ccc;
        }
    }
</style>
