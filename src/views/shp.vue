<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";
import { TOKEN, TK } from "../utils/Token";

// Token 设置
Cesium.Ion.defaultAccessToken = TOKEN;

// Viewer
let viewer: any = null;

onMounted(() => {
  initViewer();
});

const initViewer = () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    animation: true, //是否创建动画小器件，左下角仪表
    baseLayerPicker: true, //是否显示图层选择器
    fullscreenButton: true, //是否显示全屏按钮
    vrButton: true, // 用于切换 VR 模式的单个按钮小部件。
    geocoder: true, // //是否显示geocoder小器件，右上角查询按钮
    homeButton: true, //是否显示Home按钮
    infoBox: true, //是否显示信息框
    sceneModePicker: true, //是否显示3D/2D选择器
    selectionIndicator: true, //是否显示选取指示器组件
    timeline: true, //是否显示时间轴
    navigationHelpButton: true, //是否显示右上角的帮助按钮
    navigationInstructionsInitiallyVisible: true,
    scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    shouldAnimate: false, // 初始化是否开始动画
    clockViewModel: undefined, // 一个视图模型，它为用户界面提供 Clock
    selectedImageryProviderViewModel: undefined, //当前图像图层的显示模型，仅baseLayerPicker设为true有意义
    selectedTerrainProviderViewModel: undefined, //当前地形图层的显示模型，仅baseLayerPicker设为true有意义
    skyBox: new Cesium.SkyBox({
      sources: {
        positiveX: "/skyBox/00h+00.jpg",
        negativeX: "skyBox/12h+00.jpg",
        positiveY: "/skyBox/06h+00.jpg",
        negativeY: "/skyBox/18h+00.jpg",
        positiveZ: "/skyBox/06h+90.jpg",
        negativeZ: "/skyBox/06h-90.jpg",
      },
    }), //用于渲染星空的SkyBox对象
    skyAtmosphere: new Cesium.SkyAtmosphere(), // 围绕提供的椭球体边缘绘制的大气
    fullscreenElement: document.body, //全屏时渲染的HTML元素,
    useDefaultRenderLoop: true, //如果需要控制渲染循环，则设为true
    targetFrameRate: undefined, //使用默认render loop时的帧率
    showRenderLoopErrors: false, //如果设为true，将在一个HTML面板中显示错误信息
    automaticallyTrackDataSourceClocks: false, //自动追踪最近添加的数据源的时钟设置
    contextOptions: {}, //传递给Scene对象的上下文参数（scene.options）
    sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
    mapProjection: new Cesium.WebMercatorProjection(), //地图投影体系
    globe: undefined, // 在场景中渲染的地球仪，包括其地形 ( Globe#terrainProvider ) 和图像图层 ( Globe#imageryLayers )
    orderIndependentTranslucency: true,
    dataSources: new Cesium.DataSourceCollection(), //需要进行可视化的数据源的集合
    projectionPicker: undefined, //ProjectionPicker 是用于在透视和正交投影之间切换的单按钮小部件。
    // imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), //图层选择器,可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    // terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), //地形选择器,可供BaseLayerPicker选择的地形图层ProviderViewModel数组
    // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
    //   credit: "",
    //   url: "Custom url",
    // }), //图像图层提供者，仅baseLayerPicker设为false有意义
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      //高德底图
      url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    }),
    // terrainProvider: new Cesium.EllipsoidTerrainProvider(), //地形图层提供者，仅baseLayerPicker设为false有意义
  });

  // // 去除版权信息
  //@ts-ignore
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // // 增加太阳光照
  // viewer.scene.globe.enableLighting = true;

  viewer.scene.globe.depthTestAgainstTerrain = true;

  var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      // url: "https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json", //数据地址
      // url:'https://data.mars3d.cn/3dtiles/jzw-shanghai/tileset.json',
      url:'/shp/tileset.json'
      // maximumScreenSpaceError: 16, //最大的屏幕空间误差
    })
  );

  tileset.readyPromise.then(function (tileset) {
    tileset.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [["true", "color('rgb(51, 153, 255)',1)"]],
      },
    });
    var customShader = new Cesium.CustomShader({
      lightingModel: Cesium.LightingModel.UNLIT,
      fragmentShaderText: `
                    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
                        float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
                        float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _      heightRange) 默认是 0-60米
                        float _glowRange = 300.0; // 光环的移动范围(高度)
                        float vtxf_height = fsInput.attributes.positionMC.z-_baseHeight;
                        float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                        float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
                        material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
                        float vtxf_a13 = fract(czm_frameNumber / 360.0);
                        float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
                        vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
                        float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
                        material.diffuse += material.diffuse * (1.0 - vtxf_diff);
                    }       
                    `,
    });
    tileset.customShader = customShader;
    viewer.flyTo(tileset);
  });
};
</script>

<style lang="less" scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
