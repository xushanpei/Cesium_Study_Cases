<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";
import TOKEN from "../utils/Token";

// Token 设置
Cesium.Ion.defaultAccessToken = TOKEN;

// Viewer
let viewer = null;

onMounted(() => {
  initViewer();
});

const initViewer = () => {
  viewer = new Cesium.Viewer("cesiumContainer");
};
</script>

<style lang="less" scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
