<script setup>
import * as echarts from 'echarts'
import {provide} from 'vue'
// 使用provide/inject引入echart
provide('echarts', echarts)
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  overflow: hidden;
}
</style>
