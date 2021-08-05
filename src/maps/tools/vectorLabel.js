// 引入的对象和方法
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Draw, Snap } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { saveAs } from 'file-saver';
/*创建矢量标注
 *@param{object}  data  标注的数据
*/

let draw, snap, drawSource, drawLayer;
export function addInteractions(map) {
    drawSource = new VectorSource();
    drawLayer = new VectorLayer({
        source: drawSource,
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2,
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33',
                }),
            }),
        }),
    });
    map.addLayer(drawLayer)
    draw = new Draw({
        source: drawSource,
        type: "Point",
    });
    map.addInteraction(draw);
    snap = new Snap({ source: drawSource });
    map.addInteraction(snap);
}

let exportArray = [];
export function exportJson() {
    let features = drawSource.getFeatures();
    for (let i = 0; i < features.length; i++) {
        let element = features[i];
        let point = element.getGeometry().flatCoordinates;
        exportArray.push({
            "lon": point[0],
            "lat": point[1],
            "data": [
                { "type": "devices" },
                { "id": "Devices" + i },
            ]
        })
    }
    var blob = new Blob([JSON.stringify(exportArray)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "DeviceInfo.json");
}

/**
 * Handle change event.
 */
export function removeInteraction(map) {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    exportJson();
}
