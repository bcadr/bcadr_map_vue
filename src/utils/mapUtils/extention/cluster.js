import "ol-ext/dist/ol-ext.css";
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Circle, Icon, Style, Text,} from 'ol/style';
import Cluster from 'ol/source/Cluster';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import marker from '@/assets/images/map/marker.png'
let clusterSource;
console.log(marker)

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
    var clusterLayer = new AnimatedCluster({
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


// Style for selection
/* var img = new Circle({
    radius: 5,
    stroke: new Stroke({
        color: "rgba(0,255,255,1)",
        width: 1
    }),
    fill: new Fill({
        color: "rgba(0,255,255,0.3)"
    })
});
var style0 = new Style({
    image: img
});
var style1 = new Style({
    image: img,
    // Draw a link beetween points (or not)
    stroke: new Stroke({
        color: "#fff",
        width: 1
    })
}); */
// Select interaction to spread cluster out and select features
/* var selectCluster = new ol.interaction.SelectCluster({
    // Point radius: to calculate distance between the features
    pointRadius: 7,
    // circleMaxObjects: 40,
    // spiral: false,
    animate: $("#animatesel").prop('checked'),
    // Feature style when it springs apart
    featureStyle: function () {
        return [$("#haslink").prop('checked') ? style1 : style0]
    },
    // selectCluster: false,	// disable cluster selection
    // Style to draw cluster when selected
    style: function (f, res) {
        var cluster = f.get('features');
        if (cluster.length > 1) {
            var s = [getStyle(f, res)];
            if ($("#convexhull").prop("checked") && ol.coordinate.convexHull) {
                var coords = [];
                for (i = 0; i < cluster.length; i++) coords.push(cluster[i].getGeometry().getFirstCoordinate());
                var chull = ol.coordinate.convexHull(coords);
                s.push(new Style({
                    stroke: new Stroke({ color: "rgba(0,0,192,0.5)", width: 2 }),
                    fill: new Fill({ color: "rgba(0,0,192,0.3)" }),
                    geometry: new ol.geom.Polygon([chull]),
                    zIndex: 1
                }));
            }
            return s;
        } else {
            return [
                new Style({
                    image: new Circle({
                        stroke: new Stroke({ color: "rgba(0,0,192,0.5)", width: 2 }),
                        fill: new Fill({ color: "rgba(0,0,192,0.3)" }),
                        radius: 5
                    })
                })];
        }
    }
});
window.map.addInteraction(selectCluster); */

// On selected => get feature in cluster and show info
/* selectCluster.getFeatures().on(['add'], function (e) {
    var c = e.element.get('features');
    if (c.length == 1) {
        var feature = c[0];
        $(".infos").html("One feature selected...<br/>(id=" + feature.get('id') + ")");
    } else {
        $(".infos").text("Cluster (" + c.length + " features)");
    }
})


selectCluster.getFeatures().on(['remove'], function (e) {
    $(".infos").html("");
}) */