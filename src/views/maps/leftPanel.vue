<!-- 地图右键菜单管理 -->
<template>
    <div class="leftPanel" id="leftPanel">
        <ul>
            <li>
                <a-button @click="measure('distance')">测距</a-button>
            </li>
            <li>
                <a-button @click="measure('area')">测面</a-button>
            </li>
            <li>
                <a-button @click="measure('clear')">清除</a-button>
            </li>
        </ul>
    </div>
</template>

<script>
import Overlay from "ol/Overlay";

import {
    initDrawLayer,
    measureDistance,
    measureArea,
    measureClear,
    interactionClear
} from "@/maps/tools/measure.js";

export default {
    name: "leftPanel",
    data() {
        // 这里存放数据
        return {
            menu_overlay: {},
            draw: null,
        };
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.init();
    },
    // 方法集合
    methods: {
        init() {
            let that = this;
            console.log(window.map);
            initDrawLayer(window.map);
            this.menu_overlay = new Overlay({
                element: document.getElementById("leftPanel"),
                positioning: "left-top",
            });

            // 地图右键监听事件
            window.map.getViewport().oncontextmenu = (e) => {
                e.preventDefault();
            };

            window.map.getViewport().onmousedown = (e) => {
                if (e.button == 2) {
                    interactionClear(window.map);
                    var coordinate = window.map.getEventCoordinate(e);
                    that.menu_overlay.setPosition(coordinate);
                    window.map.addOverlay(that.menu_overlay);
                } else if (e.button == 1) {
                    console.log("111");
                }
            };
            
        },
        hideOverlay() {
            this.menu_overlay.setPosition(undefined);
        },
        measure(type) {
            const that = this;
            
            if (type =="distance" ) {
                that.hideOverlay();
                measureDistance(window.map);
            }else  if (type =="area" ) {
                that.hideOverlay();
                measureArea(window.map);
            }else  if (type =="clear" ) {
                that.hideOverlay();
                measureClear(window.map);
            }
        }
    },
};
</script>
<style scoped>
</style>