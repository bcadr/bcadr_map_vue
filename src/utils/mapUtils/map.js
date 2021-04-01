import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import LayerSwitcher from "ol-layerswitcher";

import Map from "ol/Map";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View"
import * as olProj from "ol/proj";
import * as olControl from 'ol/control';
import MousePosition from "ol/control/MousePosition";
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';
import * as olCoordinate from 'ol/coordinate';
import Zoom from 'ol/control/Zoom';

import { TdtLayers, ArcGisLayers } from '../../../public/config/SysConfig';

export function initMap() {
    let map = new Map({
        target: 'map',
        projection: 'EPSG:3857',
        layers: [
            // 加载ArgGis地图
            new LayerGroup({
                title: ArcGisLayers.title,
                fold: ArcGisLayers.fold,
                layers: [
                    new TileLayer({
                        title: ArcGisLayers.layer[0].title,
                        visible: ArcGisLayers.layer[0].visible,
                        source: new XYZ({
                            url: ArcGisLayers.layer[0].url
                        }),
                        ratio: 1,
                        params: { LAYERS: 'show:0' },
                        isGroup: true,
                        name: ArcGisLayers.layer[0].name
                    }),
                    new TileLayer({
                        title: ArcGisLayers.layer[1].title,
                        visible: ArcGisLayers.layer[1].visible,
                        source: new XYZ({
                            url: ArcGisLayers.layer[1].url
                        }),
                        ratio: 1,
                        params: { LAYERS: 'show:0' },
                        isGroup: true,
                        name: ArcGisLayers.layer[1].name,
                    }),
                    new TileLayer({
                        title: ArcGisLayers.layer[2].title,
                        visible: ArcGisLayers.layer[2].visible,
                        source: new XYZ({
                            url: ArcGisLayers.layer[2].url
                        }),
                        ratio: 1,
                        params: { LAYERS: 'show:0' },
                        isGroup: true,
                        name: ArcGisLayers.layer[2].name,
                    }),
                    new TileLayer({
                        title: ArcGisLayers.layer[3].title,
                        visible: ArcGisLayers.layer[3].visible,
                        source: new XYZ({
                            url: ArcGisLayers.layer[3].url
                        }),
                        ratio: 1,
                        params: { LAYERS: 'show:0' },
                        isGroup: true,
                        name: ArcGisLayers.layer[3].name,
                    }),
                ]
            }),
            // 加载天地图
            new LayerGroup({
                title: TdtLayers.title,
                fold: TdtLayers.fold,
                layers: [
                    new LayerGroup({
                        title: '天地图影像图',
                        fold: 'open',
                        layers: [
                            new TileLayer({
                                title: TdtLayers.layers[2].name,
                                visible: false,
                                source: new XYZ({
                                    crossOrigin: "anonymous",
                                    url: TdtLayers.layers[2].url,
                                }),
                                ratio: 1,
                                params: { LAYERS: 'show:0' },
                                isGroup: true,
                                name: TdtLayers.layers[2].name,
                            }),
                            new TileLayer({
                                title: TdtLayers.layers[3].name,
                                visible: false,
                                source: new XYZ({
                                    crossOrigin: "anonymous",
                                    url: TdtLayers.layers[3].url,
                                }),
                                ratio: 1,
                                params: { LAYERS: 'show:0' },
                                isGroup: true,
                                name: TdtLayers.layers[3].name,
                            }),
                        ]
                    }),
                    new LayerGroup({
                        title: '天地图地形图',
                        fold: 'open',
                        visible: false,
                        layers: [
                            new TileLayer({
                                title: TdtLayers.layers[4].name,
                                visible: false,
                                source: new XYZ({
                                    crossOrigin: "anonymous",
                                    url: TdtLayers.layers[4].url,
                                }),
                                ratio: 1,
                                params: { LAYERS: 'show:0' },
                                isGroup: true,
                                name: TdtLayers.layers[4].name,
                            }),
                            new TileLayer({
                                title: TdtLayers.layers[5].name,
                                visible: false,
                                source: new XYZ({
                                    crossOrigin: "anonymous",
                                    url: TdtLayers.layers[5].url,
                                }),
                                ratio: 1,
                                params: { LAYERS: 'show:0' },
                                isGroup: true,
                                name: TdtLayers.layers[5].name,
                            }),
                        ]
                    }),
                    new LayerGroup({
                        title: '天地图行政区划',
                        fold: 'open',
                        visible: false,
                        layers: [
                            new TileLayer({
                                title: TdtLayers.layers[0].name,
                                visible: true,
                                source: new XYZ({
                                    crossOrigin: "anonymous",
                                    url: TdtLayers.layers[0].url,
                                }),
                                ratio: 1,
                                params: { LAYERS: 'show:0' },
                                isGroup: true,
                                name: TdtLayers.layers[0].name,
                            }),
                            new TileLayer({
                                title: TdtLayers.layers[1].name,
                                visible: true,
                                source: new XYZ({
                                    crossOrigin: "anonymous",
                                    url: TdtLayers.layers[1].url,
                                }),
                                ratio: 1,
                                params: { LAYERS: 'show:0' },
                                isGroup: true,
                                name: TdtLayers.layers[1].name,
                            }),
                        ]
                    }),
                ]
            }),
            // 加载高德地图
            new LayerGroup({
                // A layer must have a title to appear in the layerswitcher
                title: '高德地图',
                fold: 'open',
                layers: [
                    new TileLayer({
                        visible: false,
                        source: new XYZ({
                            url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
                        })
                    })
                ]
            }),
            // 加载OSM地图
            new LayerGroup({
                title: 'OSM地图',
                fold: 'open',
                layers: [
                    new TileLayer({
                        visible: false,
                        source: new XYZ({
                            url: 'http://ditu.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2s m!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
                        })
                    })
                ]
            }),
        ],
        view: new View({
            center: olProj.transform([106.46912, 36.24274], 'EPSG:4326', 'EPSG:3857'),
            zoom: 5.5
        }),
        controls: olControl
            .defaults({
                attribution: false,
                zoom: true,
                rotate: false,
            })
            .extend([
                // 鼠标移动显示经纬度控件
                new MousePosition({
                    coordinateFormat: function (coord) {
                        return olCoordinate.toStringHDMS(olProj.transform(coord, 'EPSG:3857', 'EPSG:4326'));
                    },
                    projection: "EPSG:3857",
                    className: "custom-mouse-position",
                    target: document.getElementById("mouse_position"),
                    undefinedHTML: "&nbsp;",
                }),
                // 比例尺控件
                new ScaleLine(),
                // 滑动缩放的控件
                new ZoomSlider(),
                //缩放控件
                new Zoom({ target: "mapControlZoom" }),
            ]),
    });

    let layerSwitcher = new LayerSwitcher({
        tipLabel: '......',
        groupSelectStyle: 'children'
    });

    map.addControl(layerSwitcher);
    map.on('singleclick', function (e) {
        console.log(olProj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326'));
    });
    
    return map;
}
