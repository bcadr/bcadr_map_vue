import VectorSource from 'ol/source/Vector';
import VectorLayer from "ol/layer/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import * as olLoadingstrategy from 'ol/loadingstrategy';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

let roadLayer;

export function addRoad(map) {
    let roadUrl = "./config/json/bcadr_road.geojson";
    let roadSource = new VectorSource({
        format: new GeoJSON(),
        url: roadUrl,
        strategy: olLoadingstrategy.bbox,
    });
    roadLayer = new VectorLayer({
        source: roadSource,
        style: districtDefaultStyle,
    });
    function districtDefaultStyle(feature) {
        var styles = [];
        let _attr = feature.values_;
        function lineStyle() {
            let random = Math.floor(Math.random() * 5 + 1);
            if (random == "1") {
                return "rgba(255,0,0, 0.7)";
            } else if (random == "2") {
                return "rgba(0,255,0, 0.7)";
            } else if (random == "3") {
                return "rgba(255,255,0, 0.7)";
            } else if (random == "4") {
                return "rgba(127,42,42)";
            } else if (random == "5") {
                return "rgba(127,42,42)";
            }
        }
        let _color = lineStyle();
        styles.push(
            new Style({
                geometry: _attr.geometry,
                // 线样式
                stroke: new Stroke({
                    color: _color,
                    lineCap: 'round',// 设置线的两端为圆头
                    width: 5
                }),
            })
        );
        return styles;
    }
    map.addLayer(roadLayer);
}

export function delRoad(map) {
    map.removeLayer(roadLayer);
}
