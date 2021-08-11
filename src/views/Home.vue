<template>
    <div class="home">
        <div id="map" class="map">
            <div id="mouse_position"></div>
            <div class="my-scale-line"></div>
        </div>
        <div class="panels">
            <a-button @click="addPlane" :disabled="isDisabledPlane"
                >加载迁徙图</a-button
            >
            <a-button @click="delPlane">关闭迁徙图</a-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a-button @click="addPointBuffer">点缓冲区分析</a-button>
            <a-button @click="addLineBuffer">线缓冲区分析</a-button>
            <a-button @click="addPolygonBuffer">面缓冲区分析</a-button>
            <a-button @click="delBuffer">清除缓冲区</a-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a-button @click="addVoronoi" :disabled="isDisabledVoronoi"
                >泰森多边形</a-button
            >
            <a-button @click="delVoronoi">清除泰森多边形</a-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a-button @click="addRoadAnalysis" :disabled="isDisabledRoad"
                >道路分析</a-button
            >
            <a-button @click="delRoadAnalysis">取消道路分析</a-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a-button @click="addPoint">绘制点</a-button>
            <a-button @click="delPoint">退出绘制</a-button>
            <a-button @click="addCluster">添加聚合图层</a-button>
            <a-button @click="delCluster">删除聚合图层</a-button>
        </div>
        <leftPanel ref="leftPanel"></leftPanel>
    </div>
</template>

<script>
import { initMap } from "../maps/map.js";
import { addEcharts, delEcharts } from "../maps/echarts/index.js";
import {
    pointBuffer,
    lineBuffer,
    polygonBuffer,
    delBuffer,
} from "../maps/turf/buffer.js";
import { addVoronoiLayer, delVoronoiLayer } from "../maps/turf/voronoi.js";
import { addRoad, delRoad } from "../maps/road/road.js";
import { viewFlyToBcadr } from "../maps/common/flyTo.js";

import {
    addInteractions,
    removeInteraction,
} from "../maps/tools/vectorLabel.js";

import { addClusterLayer, delClusterLayer } from "../maps/extention/cluster.js";

//引入组件
const leftPanel = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./maps/leftPanel.vue'),
  // 异步组件加载时使用的组件
//   loading: LoadingComponent,
  // 加载失败时使用的组件
//   error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 0,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})

export default {
    name: "Home",
    data() {
        return {
            map: null,
            draw: null,
            isDisabledRoad: false,
            isDisabledPlane: false,
            isDisabledVoronoi: false,
            roadTimer: null,
        };
    },
    components: {
        leftPanel
    },
    mounted: function () {
        //初始化mao对象
        initMap();
        // 添加绘制图层
        // initDrawLayer(window.map);
        // 地图右键监听事件





       
    },
    methods: {
        addPlane() {
            this.isDisabledPlane = true;
            addEcharts(window.map);
        },
        delPlane() {
            this.isDisabledPlane = false;
            delEcharts();
        },
        addPointBuffer() {
            pointBuffer(window.map);
        },
        addLineBuffer() {
            lineBuffer(window.map);
        },
        addPolygonBuffer() {
            polygonBuffer(window.map);
        },
        delBuffer() {
            delBuffer(window.map);
        },
        addVoronoi() {
            this.isDisabledVoronoi = true;
            addVoronoiLayer(window.map);
        },
        delVoronoi() {
            this.isDisabledVoronoi = false;
            delVoronoiLayer(window.map);
        },
        addRoadAnalysis() {
            let that = this;
            this.isDisabledRoad = true;
            viewFlyToBcadr(window.map);
            addRoad(window.map);
            this.roadTimer = setInterval(function () {
                delRoad(that.map);
                addRoad(that.map);
            }, 3000);
        },
        delRoadAnalysis() {
            clearInterval(this.roadTimer);
            delRoad(window.map);
            this.isDisabledRoad = false;
        },
        addPoint() {
            addInteractions(window.map);
        },
        delPoint() {
            removeInteraction(window.map);
        },
        addCluster() {
            addClusterLayer();
        },
        delCluster() {
            delClusterLayer();
        },
    },
};
</script>
<style scoped>
.home {
    height: 100%;
}
.map {
    height: 100%;
}
/* 显示当前位置控件样式 */
#mouse_position {
    position: absolute;
    width: 300px;
    height: 20px;
    left: 15px;
    bottom: 10px;
    color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
.panels {
    position: absolute;
    top: 20px;
    left: 50px;
}
</style>
