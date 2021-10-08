import * as Blockly from "blockly/core";

Blockly.browserEvents.bind = function (node, name, thisObject, func) {
    var wrapFunc = function (e) {
        if (thisObject) {
            func.call(thisObject, e);
        } else {
            func(e);
        }
    };

    var bindData = [];
    if (
        Blockly.utils.global["PointerEvent"] &&
        name in Blockly.Touch.TOUCH_MAP
    ) {
        for (var i = 0, type; (type = Blockly.Touch.TOUCH_MAP[name][i]); i++) {
            node.addEventListener(type, wrapFunc, false);
            bindData.push([node, type, wrapFunc]);
        }
    } else {
        // alert(11111);
        node.addEventListener(name, wrapFunc, false);
        bindData.push([node, name, wrapFunc]);

        // Add equivalent touch event.
        if (name in Blockly.Touch.TOUCH_MAP) {
            var touchWrapFunc = function (e) {
                // Punt on multitouch events.
                if (e.changedTouches && e.changedTouches.length == 1) {
                    // Map the touch event's properties to the event.
                    var touchPoint = e.changedTouches[0];
                    e.clientX = touchPoint.clientX;
                    e.clientY = touchPoint.clientY;
                }
                wrapFunc(e);

                // Stop the browser from scrolling/zooming the page.
                e.preventDefault();
            };
            for (
                var i = 0, type;
                (type = Blockly.Touch.TOUCH_MAP[name][i]);
                i++
            ) {
                node.addEventListener(type, touchWrapFunc, false);
                bindData.push([node, type, touchWrapFunc]);
            }
        }
    }
    return bindData;
};
