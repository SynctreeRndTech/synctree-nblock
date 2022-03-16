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

Blockly.Warning.prototype.createBubble_ = function () {
  const txt = this.text_.bubble || this.getText();
  this.paragraphElement_ = Blockly.Bubble.textToDom(txt);
  this.bubble_ = Blockly.Bubble.createNonEditableBubble(
    this.paragraphElement_,
    /** @type {!Blockly.BlockSvg} */ (this.block_),
    /** @type {!Blockly.utils.Coordinate} */ (this.iconXY_)
  );
  this.applyColour();
};

Blockly.Warning.prototype.getTextById = function (id) {
  return this.text_[id];
};
