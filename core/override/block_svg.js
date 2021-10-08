import * as Blockly from "blockly/core";
// override Blockly core

/**
 * Create and initialize the SVG representation of the block.
 * May be called more than once.
 */
Blockly.BlockSvg.prototype.initSvg = function () {
    let i = 0,
        input;
    if (!this.workspace.rendered) {
        throw TypeError("Workspace is headless.");
    }
    for (i = 0; (input = this.inputList[i]); i++) {
        input.init();
    }
    var icons = this.getIcons();
    for (i = 0; i < icons.length; i++) {
        icons[i].createIcon();
    }
    this.applyColour();
    this.pathObject.updateMovable(this.isMovable());
    var svg = this.getSvgRoot();
    // if (!this.workspace.options.readOnly && !this.eventsInit_ && svg) {
    if (!this.eventsInit_ && svg) {
        Blockly.bindEventWithChecks_(svg, "mousedown", this, this.onMouseDown_);
    }
    this.eventsInit_ = true;

    if (!svg.parentNode) {
        this.workspace.getCanvas().appendChild(svg);
    }
};
