import * as Blockly from "blockly/core";

Blockly.Field.prototype.updateSize_ = function (opt_margin) {
    var constants = this.getConstants();
    var xOffset =
        opt_margin != undefined
            ? opt_margin
            : this.borderRect_
            ? this.getConstants().FIELD_BORDER_RECT_X_PADDING
            : 0;
    var totalWidth = xOffset * 2;
    var totalHeight = constants.FIELD_TEXT_HEIGHT;

    var contentWidth = 0;
    if (this.textElement_) {
        contentWidth = Blockly.utils.dom.getFastTextWidth(
            this.textElement_,
            constants.FIELD_TEXT_FONTSIZE,
            constants.FIELD_TEXT_FONTWEIGHT,
            constants.FIELD_TEXT_FONTFAMILY
        );
        totalWidth += contentWidth;
    }
    if (this.borderRect_) {
        totalHeight = Math.max(totalHeight, constants.FIELD_BORDER_RECT_HEIGHT);
    }

    this.size_.height = totalHeight * 1.4;
    this.size_.width = totalWidth;

    this.positionTextElement_(xOffset, contentWidth);
    this.positionBorderRect_();
};
