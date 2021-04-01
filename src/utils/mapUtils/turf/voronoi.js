import {viewFlyTo} from "../common/flyTo.js"

import voronoi from '@turf/voronoi'
import buffer from '@turf/buffer'

import GeoJSON from "ol/format/GeoJSON"
import Vector from "ol/source/Vector"
import VectorLayer from "ol/layer/Vector"
import style from "ol/style/Style"
import stroke from "ol/style/Stroke"
import Fill from "ol/style/Fill"
import Circle from "ol/style/Circle"
import * as olProj from 'ol/proj';

let voronoiData;
let voronoiLayer;

function convertDataToGeoJson(data) {
    voronoiData = voronoi(data, {
        bbox: [116.537163674357, 39.76442342017438, 116.54001340917684, 39.76756629218713]
    });
}

function updateView(map,voronoiData) {
    let styles = {
        'Point': new style({
            color: 'green',
            width: 1
        }),
        'LineString': new style({
            stroke: new stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiLineString': new style({
            stroke: new stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiPoint': new style({
            color: 'green',
            width: 1
        }),
        'MultiPolygon': new style({
            stroke: new stroke({
                color: 'yellow',
                width: 1
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0.1)'
            })
        }),
        'Polygon': new style({
            stroke: new stroke({
                color: 'blue',
                lineDash: [4],
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        }),
        'GeometryCollection': new style({
            stroke: new stroke({
                color: 'magenta',
                width: 2
            }),
            fill: new Fill({
                color: 'magenta'
            }),
            image: new Circle({
                radius: 10,
                fill: null,
                stroke: new stroke({
                    color: 'magenta'
                })
            })
        }),
        'Circle': new style({
            stroke: new stroke({
                color: 'red',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(255,0,0,0.2)'
            })
        })
    };

    let styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
    };

    let source = new Vector();
    let buffers = buffer(voronoiData, 0.001, {
        units: 'miles'
    });

    let features = buffers.features;
    for (let i = 0; i < features.length; i++) {
        let oljson = new GeoJSON();
        let feature = oljson.readFeature(features[i]);
        feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        source.addFeature(feature);
    }
    
    voronoiLayer = new VectorLayer({
        source: source,
        style: styleFunction
    })
    map.addLayer(voronoiLayer)
}

export function addVoronoiLayer(map) {
    fetch('./config/json/point.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            convertDataToGeoJson(json);
            updateView(map,voronoiData);
        });
        viewFlyTo(map,olProj.fromLonLat([116.53898130231798, 39.76589466010563]));
}

export function delVoronoiLayer(map) {
    map.removeLayer(voronoiLayer);
}