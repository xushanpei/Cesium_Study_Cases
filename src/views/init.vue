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
    infoBox: false, //是否显示信息框
    sceneModePicker: true, //是否显示3D/2D选择器
    selectionIndicator: true, //是否显示选取指示器组件
    timeline: true, //是否显示时间轴
    navigationHelpButton: true, //是否显示右上角的帮助按钮
    navigationInstructionsInitiallyVisible: true,
    scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    shouldAnimate: true, // 初始化是否开始动画
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
    terrainProvider: new Cesium.EllipsoidTerrainProvider(), //地形图层提供者，仅baseLayerPicker设为false有意义
  });

  // // 去除版权信息
  //@ts-ignore
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // // 增加太阳光照
  viewer.scene.globe.enableLighting = true;
  viewer.scene.globe.depthTestAgainstTerrain = false;
  // loadEarthAtNight();

  viewer.scene.fxaa = false;
  viewer.scene.postProcessStages.fxaa.enabled = false;

  var supportsImageRenderingPixelated =
    viewer.cesiumWidget._supportsImageRenderingPixelated;
  if (supportsImageRenderingPixelated) {
    var vtxf_dpr = window.devicePixelRatio;
    while (vtxf_dpr >= 2.0) {
      vtxf_dpr /= 2.0;
    }
    viewer.resolutionScale = vtxf_dpr;
  }

  // 绘制空心圆
  // var entity = viewer.entities.add({
  //   position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  //   ellipse: {
  //     semiMinorAxis: 200000.0,
  //     semiMajorAxis: 200000.0,
  //     height: 0,
  //     material: Cesium.Color.RED.withAlpha(0),
  //     outline: true,
  //     outlineColor: Cesium.Color.WHITE,
  //   },
  // });

  // 绘制3D扇形
  // var headings = Cesium.Math.toRadians(180);
  // const entity = viewer.entities.add({
  //   name: "3D扇形",
  //   position: Cesium.Cartesian3.fromDegrees(-102.0, 35.0, 20000.0),
  //   orientation: Cesium.Transforms.headingPitchRollQuaternion(
  //     Cesium.Cartesian3.fromDegrees(-102.0, 35.0, 20000.0),
  //     //new Cesium.HeadingPitchRoll(Cesium.Math.PI / 1.5, 0, 0.0)  // 1.5是扇形的朝向
  //     new Cesium.HeadingPitchRoll(headings, 0, 0.0)
  //   ),
  //   ellipsoid: {
  //     radii: new Cesium.Cartesian3(500000.0, 500000.0, 500000.0), // 扇形半径
  //     innerRadii: new Cesium.Cartesian3(1.0, 1.0, 1.0), // 内半径
  //     minimumClock: Cesium.Math.toRadians(-10), // 左右偏角
  //     maximumClock: Cesium.Math.toRadians(10),
  //     minimumCone: Cesium.Math.toRadians(80), // 上下偏角  可以都设置为90
  //     maximumCone: Cesium.Math.toRadians(90),
  //     material: Cesium.Color.DARKCYAN.withAlpha(0.3),
  //     outline: true,
  //   },
  // });

  // 2d 扇面
  var headings = Cesium.Math.toRadians(0);
  const entity = viewer.entities.add({
    name: "扇面",
    position: Cesium.Cartesian3.fromDegrees(116, 30.0, 0),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(
      Cesium.Cartesian3.fromDegrees(116, 30, 20000.0),
      //new Cesium.HeadingPitchRoll(Cesium.Math.PI / 1.5, 0, 0.0)  // 1.5是扇形的朝向
      new Cesium.HeadingPitchRoll(headings, 0, 0.0)
    ),
    ellipsoid: {
      radii: new Cesium.Cartesian3(5000.0, 5000.0, 5000.0), // 扇形半径
      innerRadii: new Cesium.Cartesian3(1.0, 1.0, 1.0), // 内半径
      minimumClock: Cesium.Math.toRadians(-20), // 左右偏角
      maximumClock: Cesium.Math.toRadians(20),
      // 上下偏角  可以都设置为90
      // 利用上下偏角控制是3d扇形还是平面扇形
      minimumCone: Cesium.Math.toRadians(90), // 最小圆锥角
      maximumCone: Cesium.Math.toRadians(90), // 最大圆锥角
      material: Cesium.Color.DARKCYAN.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.WHITE,
    },
  });
  viewer.zoomTo(entity);

  // var modal = viewer.entities.add({
  //   name: '模型',
  //   position: Cesium.Cartesian3.fromDegrees(116, 30.0, 0),
  //   orientation: Cesium.Transforms.headingPitchRollQuaternion(
  //     Cesium.Cartesian3.fromDegrees(116, 30, 20000.0),
  //     //new Cesium.HeadingPitchRoll(Cesium.Math.PI / 1.5, 0, 0.0)  // 1.5是扇形的朝向
  //     new Cesium.HeadingPitchRoll(headings, 0, 0.0)
  //   ),
  //   modal:{
  //     url: 'http://8.142.144.242:888/mainbody/重点区域/出租车辆上落客区/XA000_XAZF_A_出租车辆上落客区.gltf',//注意entitits.add方式加载gltf文件时，这里是uri，不是url，并且这种方式只能加载.glb格式的文件
  //     scale: 1.0,//缩放比例
  //     minimumPixelSize: 128,//最小像素大小，可以避免太小看不见
  //     maximumScale: 20000,//模型的最大比例尺大小。minimumPixelSize的上限
  //     incrementallyLoadTextures: true,//加载模型后纹理是否可以继续流入
  //     runAnimations: true,//是否启动模型中制定的gltf动画
  //     clampAnimations: true,//制定gltf动画是否在没有关键帧的持续时间内保持最后一个姿势
  //     shadows: Cesium.ShadowMode.ENABLED,
  //     heightReference: Cesium.HeightReference.NONE
  //   }
  // })

  // viewer.zoomTo(modal);

  // viewer.entities.removeAll();

  const position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    5000
  );
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  const entityModal = viewer.entities.add({
    name: "模型",
    position: position,
    orientation: orientation,
    model: {
      uri: "http://8.142.144.242:888/mainbody/重点区域/出租车辆上落客区/XA000_XAZF_A_出租车辆上落客区.gltf",
      minimumPixelSize: 0,
      maximumScale: 20000,
      // shadows: Cesium.ShadowMode.CAST_ONLY
    },
  });
  viewer.trackedEntity = entityModal;

};

// 加载昼夜联动
// const loadEarthAtNight = () => {
//   const dynamicLighting = true;
//   viewer.clock.multiplier = 4000;
//   const imageryLayers = viewer.imageryLayers;
//   const nightLayer = imageryLayers.get(0);
//   const dayLayer = imageryLayers.addImageryProvider(
//     new Cesium.IonImageryProvider({
//       assetId: 3845,
//     })
//   );

//   imageryLayers.lowerToBottom(dayLayer);
//   updateLighting(dynamicLighting, nightLayer, dayLayer);
// };
// // 更新光照效果
// const updateLighting = (
//   dynamicLighting: any,
//   nightLayer: any,
//   dayLayer: any
// ) => {
//   dayLayer.show = dynamicLighting;
//   viewer.scene.globe.enableLighting = dynamicLighting;
//   viewer.clock.shouldAnimate = dynamicLighting;
//   nightLayer.dayAlpha = dynamicLighting ? 1.0 : 1.0;
// };
</script>

<style lang="less" scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
