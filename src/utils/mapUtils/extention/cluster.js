import "ol-ext/dist/ol-ext.css";
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Circle, Icon, Style, Text,} from 'ol/style';
import Cluster from 'ol/source/Cluster';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import marker from '@/assets/images/map/marker.png'
let clusterSource;
let clusterLayer;

// Addfeatures to the cluster
function addFeatures(nb) {
    var ext = window.map.getView().calculateExtent(window.map.getSize());
    var features = [];
    for (var i = 0; i < nb; ++i) {
        features[i] = new Feature(new Point([ext[0] + (ext[2] - ext[0]) * Math.random(), ext[1] + (ext[3] - ext[1]) * Math.random()]));
        features[i].set('id', i);
    }
    // clusterSource.getSource().clear();
    clusterSource.getSource().addFeatures(features);
}

// Style for the clusters
var styleCache = {};
function getStyle(feature) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (!style) {
        if (size == 1) {
            style = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: marker
                }),
            })
        }else {
            var color = size > 25 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
            var radius = Math.max(8, Math.min(size * 0.75, 20));
            var dashs = 2 * Math.PI * radius / 6;
            var dash = [0, dashs, dashs, dashs, dashs, dashs, dashs];
            style = styleCache[size] = new Style({
                image: new Circle({
                    radius: radius,
                    stroke: new Stroke({
                        color: "rgba(" + color + ",0.5)",
                        width: 15,
                        lineDash: dash,
                        lineCap: "butt"
                    }),
                    fill: new Fill({
                        color: "rgba(" + color + ",1)"
                    })
                }),
                text: new Text({
                    text: size.toString(),
                    //font: 'bold 12px comic sans ms',
                    //textBaseline: 'top',
                    fill: new Fill({
                        color: '#fff'
                    })
                })
            });
        }
        
    }
    return style;
}

// Cluster Source
export function addClusterLayer() {
    clusterSource = new Cluster({
        distance: 40,
        source: new VectorSource()
    });
    // Animated cluster layer
    clusterLayer = new AnimatedCluster({
        name: 'Cluster',
        source: clusterSource,
        // animationDuration: document.getElementById("#animatecluster").prop('checked') ? 700 : 0,
        // Cluster style
        style: getStyle
    });
    window.map.addLayer(clusterLayer);
    // add 2000 features
    addFeatures(2000);
}

export function delClusterLayer() {
    window.map.removeLayer(clusterLayer);
}
