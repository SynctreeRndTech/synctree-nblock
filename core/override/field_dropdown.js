import * as Blockly from "blockly/core";

/**
 * Renders the selected option, which must be text.
 * @private
 */
Blockly.FieldDropdown.prototype.renderSelectedText_ = function () {
    // Retrieves the selected option to display through getText_.
    this.textContent_.nodeValue = this.getDisplayText_();
    Blockly.utils.dom.addClass(
        /** @type {!Element} */ (this.textElement_),
        "blocklyDropdownText"
    );
    this.textElement_.setAttribute("text-anchor", "start");

    // Height and width include the border rect.
    var hasBorder = !!this.borderRect_;
    var height = Math.max(
        hasBorder ? this.getConstants().FIELD_DROPDOWN_BORDER_RECT_HEIGHT : 0,
        this.getConstants().FIELD_TEXT_HEIGHT
    );
    var textWidth = Blockly.utils.dom.getFastTextWidth(
        this.textElement_,
        this.getConstants().FIELD_TEXT_FONTSIZE,
        this.getConstants().FIELD_TEXT_FONTWEIGHT,
        this.getConstants().FIELD_TEXT_FONTFAMILY
    );
    var xPadding = hasBorder
        ? this.getConstants().FIELD_BORDER_RECT_X_PADDING
        : 0;
    var arrowWidth = 0;
    if (this.svgArrow_) {
        arrowWidth = this.positionSVGArrow_(
            textWidth + xPadding,
            height / 2 - this.getConstants().FIELD_DROPDOWN_SVG_ARROW_SIZE / 2
        );
    }
    this.size_.width = textWidth + arrowWidth + xPadding * 2;
    this.size_.height = height * 1.4;

    this.positionTextElement_(xPadding, textWidth);
};

/**
 * Updates the dropdown arrow to match the colour/style of the block.
 * @package
 */
Blockly.FieldDropdown.prototype.applyColour = function () {
    // Update arrow's colour.
    if (this.sourceBlock_ && this.arrow_) {
        if (this.sourceBlock_.isShadow()) {
            this.arrow_.style.fill = "";
        } else {
            this.arrow_.style.fill = "";
        }
    }
};
