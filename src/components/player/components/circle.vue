<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }

    },
    data () {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset () {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>

<style scoped lang="less">

  .progress-circle {
    position: relative;
    width: 100%;
    height: 100%;

    circle {
      stroke-width: 4px;
      transform-origin: center;

      &.progress-background {
        transform: scale(0.9);
        stroke: rgba(0, 0, 0, 0.2);
      }

      &.progress-bar {
        transform: scale(0.9) rotate(-90deg);
        stroke: #fd6c62;
      }
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 4px;
      left: 4px;
    }
  }
</style>
