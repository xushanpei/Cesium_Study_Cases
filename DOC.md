### 坐标转换
1. 经纬度转笛卡尔坐标

```js
Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
```

2. 笛卡尔坐标转经纬度

```js
Cesium.Cartographic.fromCartesian({x,y,z});
```

3. 弧度转角度

```js
Cesium.Math.toDegrees(radians);
```

4. 角度转弧度

```js
Cesium.Math.toRadians(degrees);
```

