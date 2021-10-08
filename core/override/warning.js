import * as Blockly from "blockly/core";

Blockly.Warning.prototype.drawIcon_ = function (group) {
    // Triangle with rounded corners.
    Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.PATH,
        {
            class: "blocklyIconShape",
            d: "M2,15Q-1,15 0.5,12L6.5,1.7Q8,-1 9.5,1.7L15.5,12Q17,15 14,15z",
        },
        group
    );
    // Can't use a real '!' text character since different browsers and operating
    // systems render it differently.
    // Body of exclamation point.
    // Blockly.utils.dom.createSvgElement(
    //     Blockly.utils.Svg.PATH,
    //     {
    //       'class': 'blocklyIconSymbol',
    //       'd': 'm7,4.8v3.16l0.27,2.27h1.46l0.27,-2.27v-3.16z'
    //     },
    //     group);
    // // Dot of exclamation point.
    // Blockly.utils.dom.createSvgElement(
    //     Blockly.utils.Svg.RECT,
    //     {
    //       'class': 'blocklyIconSymbol',
    //       'x': '7', 'y': '11', 'height': '2', 'width': '2'
    //     },
    //     group);
    Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.PATH,
        {
            class: "blocklyIconSymbol",
            d:
                "M9,11.4H7v2h2V11.4z M9,4H7v6h2V4z M2.6,15c-2.3,0-3.2-1.7-2.1-3.7l5.4-9.7c1.1-2,3-2,4.2,0l5.4,9.7c1.1,2,0.2,3.7-2.1,3.7" +
                "H2.6z",
        },
        group
    );
};

// @ts-ignore
Blockly.Warning.prototype.createBubble = function () {
    // TODO (#2943): This is package because comments steal this UI for
    //  non-editable comments, but really this should be private.
    let txt = this.text_.bubble || this.getText();
    this.paragraphElement_ = Blockly.Warning.textToDom_(txt);
    // this.paragraphElement_ = Blockly.Warning.textToDom_(this.getText());
    this.bubble_ = new Blockly.Bubble(
        /** @type {!Blockly.WorkspaceSvg} */ this.block_.workspace,
        this.paragraphElement_,
        this.block_.pathObject.svgPath,
        /** @type {!Blockly.utils.Coordinate} */ this.iconXY_,
        null,
        null
    );
    // Expose this warning's block's ID on its top-level SVG group.
    this.bubble_.setSvgId(this.block_.id);
    if (this.block_.RTL) {
        // Right-align the paragraph.
        // This cannot be done until the bubble is rendered on screen.
        var maxWidth = this.paragraphElement_.getBBox().width;
        for (
            var i = 0, textElement;
            (textElement = this.paragraphElement_.childNodes[i]);
            i++
        ) {
            textElement.setAttribute("text-anchor", "end");
            textElement.setAttribute(
                "x",
                maxWidth + Blockly.Bubble.BORDER_WIDTH
            );
        }
    }
    this.applyColour();
};

Blockly.Warning.prototype.getTextById = function (id) {
    return this.text_[id];
};
