const TdtLayers = {
    title: '天地图',
    // 天地图图层组是否展开
    fold: 'open',
    layers: [
        {
            index: 0,
            text: 'tdt',
            url: "https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6d1185c1644e0ba1f028a167da5f6b06",
            type: 'imagelayer',
            name: '天地图',
            showincontrol: true
        },
        {
            index: 1,
            text: 'tdtLabel',
            url: "https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6d1185c1644e0ba1f028a167da5f6b06",
            type: 'imagelayer',
            name: '天地图标注',
            showincontrol: true
        },
        {
            index: 2,
            text: 'tdtImg',
            url: "https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6d1185c1644e0ba1f028a167da5f6b06",
            type: 'imagelayer',
            name: '天地图影像',
            showincontrol: true
        },
        {
            index: 3,
            text: 'tdtImgLabel',
            url: "https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=6d1185c1644e0ba1f028a167da5f6b06",
            type: 'imagelayer',
            name: '天地图影像标注',
            showincontrol: true
        },
        {
            index: 4,
            text: 'tdt',
            url: "https://t0.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=6d1185c1644e0ba1f028a167da5f6b06",
            type: 'imagelayer',
            name: '天地图地形图',
            showincontrol: true
        },
        {
            index: 5,
            text: 'tdtLabel',
            url: "https://t0.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=6d1185c1644e0ba1f028a167da5f6b06",
            type: 'imagelayer',
            name: '天地图地形图标注',
            showincontrol: true
        },

    ],
}
const ArcGisLayers = {
    title: 'arcgis在线地图',
    // 控制图层组是否展开
    fold: 'open',
    layer: [
        {
            index: 0,
            title: '彩色风格',
            // 控制图层是否显示
            visible: false,
            url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            name: '彩色风格'
        },
        {
            index: 1,
            title: "灰色风格",
            // 控制图层是否显示
            visible: false,
            url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
            name: '灰色风格'
        },
        {
            index: 2,
            title: "暖色风格",
            // 控制图层是否显示
            visible: false,
            url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
            name: '暖色风格'
        },
        {
            index: 3,
            title: "暗夜风格",
            // 控制图层是否显示
            visible: false,
            url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            name: '暗夜风格'
        }
    ]
}
export { TdtLayers, ArcGisLayers }
