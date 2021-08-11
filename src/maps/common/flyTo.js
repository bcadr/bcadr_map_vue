// import * as olProj from "ol/proj";

export function viewFlyTo(map,location) {
    let view = map.getView();
    var duration = 2000;
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;
    view.animate(
        {
            center: location,
            duration: duration,
        },
        callback
    );
    view.animate(
        {
            zoom: zoom - 1,
            duration: duration / 2,
        },
        {
            zoom: 14,
            duration: duration * 1.5,
        },
        callback
    );
    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
        }
    }
}

export function viewFlyToBcadr(map){
    viewFlyTo(map,[116.53898130231798, 39.76589466010563]);
}
