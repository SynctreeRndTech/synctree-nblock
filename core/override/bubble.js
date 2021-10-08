import * as Blockly from "blockly/core";
Blockly.Bubble.prototype.setColour = function (_hexColour) {
    // this.bubbleBack_.setAttribute('fill', hexColour);
    // this.bubbleArrow_.setAttribute('fill', hexColour);
    this.bubbleBack_.setAttribute("fill", "#1c1f24");
    this.bubbleBack_.setAttribute("stroke", "#6a707a");
    this.bubbleArrow_.setAttribute("fill", "#444852");
    this.bubbleArrow_.setAttribute("stroke", "#6a707a");
};

Blockly.Bubble.prototype.createDom_ = function (content, hasResize) {
    /* Create the bubble.  Here's the markup that will be generated:
    <g>
      <g filter="url(#blocklyEmbossFilter837493)">
        <path d="... Z" />
        <rect class="blocklyDraggable" rx="8" ry="8" width="180" height="180"/>
      </g>
      <g transform="translate(165, 165)" class="blocklyResizeSE">
        <polygon points="0,15 15,15 15,0"/>
        <line class="blocklyResizeLine" x1="5" y1="14" x2="14" y2="5"/>
        <line class="blocklyResizeLine" x1="10" y1="14" x2="14" y2="10"/>
      </g>
      [...content goes here...]
    </g>
    */
    this.bubbleGroup_ = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.G,
        {},
        null
    );

    var bubbleEmboss = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.G,
        {},
        this.bubbleGroup_
    );
    this.bubbleArrow_ = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.PATH,
        {},
        bubbleEmboss
    );
    this.bubbleBack_ = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.RECT,
        {
            class: "blocklyDraggable",
            x: 0,
            y: 0,
            rx: Blockly.Bubble.BORDER_WIDTH,
            ry: Blockly.Bubble.BORDER_WIDTH,
        },
        bubbleEmboss
    );
    if (hasResize) {
        this.resizeGroup_ = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.G,
            {
                class: this.workspace_.RTL
                    ? "blocklyResizeSW"
                    : "blocklyResizeSE",
            },
            this.bubbleGroup_
        );
        var resizeSize = 2 * Blockly.Bubble.BORDER_WIDTH;
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.POLYGON,
            { points: "0,x x,x x,0".replace(/x/g, resizeSize.toString()) },
            this.resizeGroup_
        );
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.LINE,
            {
                class: "blocklyResizeLine",
                x1: resizeSize / 3,
                y1: resizeSize - 1,
                x2: resizeSize - 1,
                y2: resizeSize / 3,
            },
            this.resizeGroup_
        );
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.LINE,
            {
                class: "blocklyResizeLine",
                x1: (resizeSize * 2) / 3,
                y1: resizeSize - 1,
                x2: resizeSize - 1,
                y2: (resizeSize * 2) / 3,
            },
            this.resizeGroup_
        );
    } else {
        this.resizeGroup_ = null;
    }

    if (!this.workspace_.options.readOnly) {
        this.onMouseDownBubbleWrapper_ = Blockly.browserEvents.conditionalBind(
            this.bubbleBack_,
            "mousedown",
            this,
            this.bubbleMouseDown_
        );
        if (this.resizeGroup_) {
            this.onMouseDownResizeWrapper_ =
                Blockly.browserEvents.conditionalBind(
                    this.resizeGroup_,
                    "mousedown",
                    this,
                    this.resizeMouseDown_
                );
        }
    }
    this.bubbleGroup_.appendChild(content);
    return this.bubbleGroup_;
};
