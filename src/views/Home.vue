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
            <a-button @click="mDistance">测距</a-button>
            <a-button @click="mArea">测面</a-button>
            <a-button @click="mClear">清除</a-button>
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
            <a-button @click="addPoint">绘制点</a-button
            >
            <a-button @click="delPoint">退出绘制</a-button>
        </div>
    </div>
</template>

<script>
import { initMap } from "../utils/mapUtils/map.js";
import { addEcharts, delEcharts } from "../utils/mapUtils/echarts/index.js";
import {
    initDrawLayer,
    measureDistance,
    measureArea,
    measureClear,
} from "../utils/mapUtils/tools/measure.js";
import {
    pointBuffer,
    lineBuffer,
    polygonBuffer,
    delBuffer,
} from "../utils/mapUtils/turf/buffer.js";
import {
    addVoronoiLayer,
    delVoronoiLayer,
} from "../utils/mapUtils/turf/voronoi.js";
import { addRoad, delRoad } from "../utils/mapUtils/road/road.js";
import { viewFlyToBcadr } from "../utils/mapUtils/common/flyTo.js";

import {addInteractions,removeInteraction} from "../utils/mapUtils/tools/vectorLabel.js"

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
    components: {},
    mounted: function () {
        //初始化mao对象
        this.map = initMap();
        // 添加绘制图层
        initDrawLayer(this.map);
    },
    methods: {
        addPlane() {
            this.isDisabledPlane = true;
            addEcharts(this.map);
        },
        delPlane() {
            this.isDisabledPlane = false;
            delEcharts();
        },
        mDistance() {
            measureDistance(this.map);
        },
        mArea() {
            measureArea(this.map);
        },
        mClear() {
            measureClear(this.map);
        },
        addPointBuffer() {
            pointBuffer(this.map);
        },
        addLineBuffer() {
            lineBuffer(this.map);
        },
        addPolygonBuffer() {
            polygonBuffer(this.map);
        },
        delBuffer() {
            delBuffer(this.map);
        },
        addVoronoi() {
            this.isDisabledVoronoi = true;
            addVoronoiLayer(this.map);
        },
        delVoronoi() {
            this.isDisabledVoronoi = false;
            delVoronoiLayer(this.map);
        },
        addRoadAnalysis() {
            let that = this;
            this.isDisabledRoad = true;
            viewFlyToBcadr(this.map);
            addRoad(this.map);
            this.roadTimer = setInterval(function () {
                delRoad(that.map);
                addRoad(that.map);
            }, 3000);
        },
        delRoadAnalysis() {
            clearInterval(this.roadTimer);
            delRoad(this.map);
            this.isDisabledRoad = false;
        },
        addPoint() {
            addInteractions(this.map);
        },
        delPoint() {
            removeInteraction(this.map);
        }
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
