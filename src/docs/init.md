> 哈喽,大家好 我是 `xy`👨🏻‍💻。这篇文章是 `Cesium 三维地球可视化从入门到进阶`专栏的第一篇，从今天起，让我带着各位一起探索 `CesiumJS` 的编程世界吧

## 前言

🎯 从今天起开始陆续的更新 `Cesium 三维地球可视化从入门到进阶`专栏的系列文章了, 如果你也对 `三维可视化`比较感兴趣的话，欢迎关注我一起学习

🎯 本次专栏所有案例都基于 `Vue3 + Vite3 + TypeScript + CesiumJS` 开发，并且所有案列的代码都会统一放到 `github`仓库中，开放给大家 `免费学习`使用

🎯 这里奉上 📚`Github仓库`的地址：`https://github.com/xushanpei/Cesium_Study_Cases`

## CesiumJS 概述

`CesiumJS` 是一个用于显示 `三维地球`和 `地图`的开源 `js` 库。支持 `3D`, `2.5D`, `2D` 形式的地图展示，它可以用来显示海量 `三维模型`数据、`影像`数据、`地形高程`数据、`矢量`数据等等。同时也可以自行 `绘制图形`，`高亮`区域等，且支持绝大多数的浏览器和移动端

### 主要功能介绍

- 使用 `3d tiles` 格式流式加载各种不同的 `3d` 数据，包含 `倾斜摄影`模型、`三维建筑物`、`CAD` 和 `BIM` 的外部和内部，`点云`数据。并支持样式配置和用户交互操作。
- 全球高精度 `地形数据`可视化，支持地形夸张效果、以及可编程实现的 `等高线`和 `坡度`分析效果。
- 支持多种资源的图像图层，包括 `WMS`，`TMS`，`WMTS` 以及时序图像。图像支持透明度 `叠加`、`亮度`、`对比度`、`GAMMA`、`色调`、`饱和度`都可以动态调整。
- 支持标准的 `矢量格式` `KML`、`GeoJSON`、`TopoJSON`、以及矢量的 `贴地`效果。
- 三维模型支持 `gltf2.0` 标准的 `PRB` 材质、`动画`、`蒙皮`和 `变形`效果。
- 使用 `CZML` 支持动态时序数据的展示。
- 支持各种几何体：`点`、`线`、`面`、`标注`、`公告牌`、`立方体`、`球体`、`椭圆体`、`圆柱体`、`走廊`、`管径`、`墙体`。
- 可视化效果包括：基于太阳位置的 `阴影`、`自身阴影`、`柔和阴影`。
- 支持 `大气`、`雾`、`太阳`、`阳光`、`月亮`、`星星`、`水面`。
- 粒子特效：`烟`、`火`、`火花`。
- `地形`、`模型`、`3d tiles` 模型的面裁剪。
- 对象 `点选`和 `地形点选`。
- 支持鼠标和触摸操作的 `缩放`、`渲染`、`惯性平移`、`飞行`、`任意视角`、`地形碰撞检测`。
- 支持 `3d` 地球、`2d`地图、`2.5d` 哥伦布模式。`3d` 视图可以使用透视和正视两种投影方式。
- 支持 `点`、`标注`、`公告牌`的聚集效果。

## 基础环境搭建

### Vue3 环境搭建

首先确保你安装了 `Node.js`(Node 安装过程这里不做过多讲解，直接官网下载安装即可)，然后在 `命令行`中 `运行`以下命令：

```sh
npm init vue@latest
```

这一指令将会安装并执行 `create-vue`，它是 `Vue` 官方的项目脚手架工具。你将会看到一些诸如 `TypeScript` 和 `测试支持`之类的可选功能提示, 这里按照个人需求安装选择对应的功能即可：

```sh
✔ Project name: … <cesium-study-cases>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

更多的项目配置以及使用教程，可以参考我之前的写的文章：

[🔥Vite2 + Vue3 + TypeScript + Pinia 搭建一套企业级的开发脚手架](https://juejin.cn/post/7036745610954801166)

[🔥Vue3.x script setup 语法糖详解,助力快速上手 Vue3.x](https://juejin.cn/post/7082013054073831431)

[🔥 最详细的 Vue3 + TypeScript 使用教程](https://juejin.cn/post/7121253172013694990)

### 安装 Cesium

目前 `Vite` 项目下安装 `CesiumJS` 有两种方式：

1. 直接到官方 `下载源码`引入到项目中使用
2. `npm` 方式结合使用 `Vite` 插件 `vite-plugin-cesium` 来安装

### 下载源码安装

打开官网: `https://www.cesium.com/` => `Platform` => `CesiumJS`

![](https://files.mdnice.com/user/16854/b0b52b56-7b48-4daa-a1f2-7317ec94a0d7.png)
![](https://files.mdnice.com/user/16854/286153db-92cf-4f41-9515-77dbfa9e325a.png)

点击 `下载`，下载完成后 `解压`，拷贝 `Build` 目录下的 `Cesium` 下的所有内容到项目的 `public` 目录下即可
![](https://files.mdnice.com/user/16854/da670310-9de0-4009-92d5-f9796a9c4aea.png)

入口文件 `index.html` 中引入：

```html
<link rel="stylesheet" href="/cesium/Widgets/widgets.css" />
<script src="/cesium/Cesium.js"></script>
```

### npm 下载安装

```sh
npm i cesium
npm i -D vite-plugin-cesium
```

`vite.config.ts` 中配置：

```js
import cesium from 'vite-plugin-cesium'; // 引入插件

export default defineConfig({
    plugins: [cesium()]
});
```

以上两种方式任选一种安装即可，本次项目中的采用的是 `第二种` npm 安装的方式

### 让 VScode 可以提示 Cesium 配置

```
npm i -S @types/cesium
```

好了，基础的环境配置好了，下面来创建一个属于自己的三维地球吧！！！

## 创建一个属于自己的三维地球

### 申请 Token

在动手写代码之前，记得先去 `Cesium` 申请一个 `Token`。

`Cesium` 建议开发者在开发前申请一个单独的 `令牌(token)`，这个 `Token` 的作用是可以在 `Cesium`项目中调用 `地图`和 `地形`服务。

打开 `https://cesium.com/ion` 网址注册登录自己的账号

![](https://files.mdnice.com/user/16854/d7ec6c18-6c56-4136-a62d-fda8112d985d.png)

在 `Access Tokens`界面 `Create token`，

![](https://files.mdnice.com/user/16854/16f93737-19b7-4c9b-bc5b-bc3ad09419d7.png)

给自己的 `Token` 定义一个名称，然后根据自己的需求 `勾选`对应的功能即可

![](https://files.mdnice.com/user/16854/05dac9bd-a4a4-4789-b496-5edda772e10e.png)

创建成功后复制 `Token` 保存下来

![](https://files.mdnice.com/user/16854/78d98a11-5642-4fc4-ac17-4f4353f2b6f9.png)

这里我直接在项目的文件夹下新建一个 `utils` 文件夹， 在 `utils` 文件夹下新建一个 `Token.ts` ,专门用来保存我们的 `Token`

![](https://files.mdnice.com/user/16854/b2d405fa-1e2c-4d9f-a3c0-e8ac0206c348.png)

### 创建三维地球

1.在 `src => view` 目录下创建一个 `init.vue` , 初始化出一个组件模板并且引入 `Cesium`

```js
import Cesium from "cesium"
```

引入成功后运行发现报错了：

![](https://files.mdnice.com/user/16854/890aed82-786d-41d8-84ad-f8206541a1ef.png)

这个错误的大致意思是 `cesium.js` 没有提供名为“`default`”的导出, 解决方式有两种：

- 全量导出，`as` 重命名

```js
import * as Cesium from "cesium"
```

- 直接 `解构`出需要的模块名称, 不知道什么是解构的建议看看 `es6`

```js
import { Viewer } from "cesium"
```

2.创建容器，初始化 `Viewer`

```JS
import cesium from 'vite-plugin-cesium';
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
```

![](https://files.mdnice.com/user/16854/be9ee9dc-3016-453b-b3c5-33c5bccc2f3b.png)

这样一个简单的 cesiumJS 三维数字地球就运行起来了


## 基础要素讲解

任何 `Cesium` 应用程序的基础都是 `Viewer`，`Viewer` 是一个带有多种功能的可交互的`三维数字地球`的容器，同时初始化界面也默认自带了一些组件，其初始化场景及组件`数字标号`如下图所示：

![](https://files.mdnice.com/user/16854/4fcf52d7-5120-4dbd-89e3-4a91d36d9650.png)

每一个`组件`的描述如下：

1. `Geocoder`：查找位置工具，查找到之后会将镜头对准找到的地址
2. `HomeButton`：首页位置，点击之后将视图跳转到默认全球视角
3. `SceneModePicker`：选择视角的模式，3D，2D，2.5D 哥伦布视图
4. `BaseLayerPicker`：图层选择器，选择要显示的地图服务和地形服务
5. `NavigationHelpButton`：导航帮助按钮，显示默认的地图控制帮助
6. `Animation`：动画器件，控制视图动画的播放速度
7. `CreditsDisplay`：展示商标版权和数据归属
8. `Timeline`：时间轴，指示当前时间，并允许用户跳到特定的时间
9. `FullscreenButton`：全屏按钮

`Viewer` 中常用配置详解如下:

```JS
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
```
虽然 `Cesium` 自带的一些组件`功能`都比较`强大`,但是奈何大多数情况下,我们都需要`重写`这些组件来`适配`我们的`项目`, 所以很多时候都是把这些小组件`隐藏`起来



## 修改天空背景(skyBox)

Cesium 自带的天空背景偏黑色,

天空盒子的制作方法并没有采用上述方法。

想象一下，一个立方体盒子将天球包围，从球心到球面上任意一点的连线延伸出去必然与立方体盒子的一个面相交，从而将球面上的一个点映射到立方体的一个面上。最终完整的天球映射到立方体盒子的两个面上，形成6张正方形的图片。所以说天空盒子的贴图是6张（也叫立方体贴图），分别对应6个方向的星空背景贴图。


```JS
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
```


https://blog.csdn.net/qq_21048515/article/details/105686890?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-105686890-blog-122687181.t0_edu_mlt&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-105686890-blog-122687181.t0_edu_mlt&utm_relevant_index=12

https://gitee.com/hawk86104/vue3-ts-cesium-map-show

https://new.qq.com/rain/a/20220816A0A0XK00

https://blog.csdn.net/u010358183/article/details/121931106

🔥🔥🔥⭐️