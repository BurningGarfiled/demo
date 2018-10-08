<template>
  <div class="v-canvas">
    <canvas id="verification" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'verificationNumber',
  props: {
    // 画布宽度
    contentWidth: {
      type: Number,
      default: 80
    },
    // 画布高度
    contentHeight: {
      type: Number,
      default: 40
    },
    // 验证码内容
    verification: {
      type: String,
      default: '9527'
    },
    // 字体最小值
    fontSizeMin: {
      type: Number,
      default: 24
    },
    // 字体最大值
    fontSizeMax: {
      type: Number,
      default: 24
    },
    // 字体颜色最小值
    colorMin: {
      type: Number,
      default: 20
    },
    colorMax: {
      type: Number,
      default: 50
    },
    // 背景色最小值
    bgColorMin: {
      type: Number,
      default: 200
    },
    // 背景色最大值
    bgColorMax: {
      type: Number,
      default: 240
    },
    // 干扰线颜色最小值
    lineColorMin: {
      type: Number,
      default: 100
    },
    // 干扰线颜色最大值
    lineColorMax: {
      type: Number,
      default: 180
    },
    // 干扰点颜色最小值
    dotColorMin: {
      type: Number,
      default: 0
    },
    // 干扰点颜色最大值
    dotColorMax: {
      type: Number,
      default: 255
    }
  },
  methods: {

  },
  mounted () {

  },
  watch: {
    verification () {
      console.log(111)
    }
  }
}
</script>
