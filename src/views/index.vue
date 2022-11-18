<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10"/>
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor"/>
            <div class="title">
              <span class="title-text">大数据可视化平台</span>
              <dv-decoration-6
                  class="dv-dec-6"
                  :reverse="true"
                  :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
                class="dv-dec-8"
                :reverse="true"
                :color="decorationColor"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s"/>
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-left"></span>
              <span class="text">数据分析1</span>
            </div>
            <div class="react-left ml-3">
              <span class="text">数据分析2</span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">xinran-vue-big-screen</span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text"
              >{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span
              >
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <CenterLeft1/>
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <CenterLeft1/>
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <Center/>
            </div>
            <!-- 中间 -->
            <div>
              <CenterRight2/>
            </div>
            <div>
              <dv-border-box-13>
                <CenterRight1/>
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-box">
            <dv-border-box-13>
              <BottomLeft/>
            </dv-border-box-13>
            <dv-border-box-12>
              <BottomRight/>
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CenterLeft1 from './centerLeft1.vue'
import CenterRight1 from './centerRight1.vue'
import CenterRight2 from './centerRight2.vue'
import Center from './center.vue'
import BottomLeft from './bottomLeft.vue'
import BottomRight from './bottomRight.vue'

import {formatTime} from '../utils'

const {proxy} = getCurrentInstance()

let timing = null
let loading = ref(true);
let dateDay = null
let dateYear = null
let dateWeek = null
const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const decorationColor = ['#568aea', '#000000']

// 屏幕适配函数
// * 默认缩放值
const scale = {
  width: '1',
  height: '1',
}
// * 设计稿尺寸（px）
const baseWidth = 1920
const baseHeight = 1080
// * 需保持的比例（默认1.77778）
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
let drawTiming = null


onMounted(() => {
  timeFn()
  cancelLoading()
  calcRate()
  window.addEventListener('resize', resize)
})
onBeforeUnmount(() => {
      window.removeEventListener('resize', resize)
      clearInterval(timing)
    }
)

function timeFn() {
  timing = setInterval(() => {
    dateDay = formatTime(new Date(), 'HH: mm: ss')
    dateYear = formatTime(new Date(), 'yyyy-MM-dd')
    dateWeek = weekday[new Date().getDay()]
  }, 1000)
}

function cancelLoading() {
  setTimeout(() => {
    loading.value = false
  }, 50)
}

function calcRate() {
  const appRef = proxy.$refs["appRef"]
  if (!appRef) return
  // 当前宽高比
  const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
  if (appRef) {
    if (currentRate > baseProportion) {
      // 表示更宽
      scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
      scale.height = (window.innerHeight / baseHeight).toFixed(5)
      appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
    } else {
      // 表示更高
      scale.height = ((window.innerWidth / baseProportion) / baseHeight).toFixed(5)
      scale.width = (window.innerWidth / baseWidth).toFixed(5)
      appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
    }
  }
}

function resize() {
  clearTimeout(drawTiming)
  drawTiming = setTimeout(() => {
    calcRate()
  }, 200)
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
</style>
