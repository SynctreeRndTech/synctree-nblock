import * as Blockly from "blockly/core";

/**
 * 멀티라인인풋은 textarea를 사용하는데 textarea 내부에 padding을 설정하고 있다.
 * textarea에 값을 입력하면 textarea의 부모 div와 크기를 동기화하는데
 * div의 너비가 충분히 보장되지 않으면 textarea가 잘못 표시(줄바꿈되어 표시됨)되는 문제가 발생한다.
 * 따라서 div를 다른 block보다 넓게 표시해야하는데 div만 넓게 설정하면 우측이 너무 넓게 표시된다.
 * 이에 왼쪽보다는 작은 padding값을 사용한다.
 * @return {int} 우측 padding
 */
Blockly.FieldMultilineInput.prototype.getRightPadding = function () {
    return this.getConstants().FIELD_BORDER_RECT_X_PADDING - 2;
};

/**
 * Updates the size of the field based on the text.
 * @protected
 */
Blockly.FieldMultilineInput.prototype.updateSize_ = function () {
    var nodes = this.textGroup_.childNodes;
    var totalWidth = 0;
    var totalHeight = 0;
    for (var i = 0; i < nodes.length; i++) {
        var tspan = /** @type {!Element} */ (nodes[i]);
        var textWidth = Blockly.utils.dom.getTextWidth(tspan);
        if (textWidth > totalWidth) {
            totalWidth = textWidth;
        }
        totalHeight +=
            this.getConstants().FIELD_TEXT_HEIGHT +
            (i > 0 ? this.getConstants().FIELD_BORDER_RECT_Y_PADDING : 0);
    }
    if (this.borderRect_) {
        totalHeight += this.getConstants().FIELD_BORDER_RECT_Y_PADDING * 2;
        // div의 너비가 너무 작게 커지만 textarea가 잘려서 표시된다.
        // 따라서 너비를 textarea의 padding만큼 더 크게 조정한다.
        totalWidth +=
            this.getConstants().FIELD_BORDER_RECT_X_PADDING * 2 +
            this.getRightPadding();
        this.borderRect_.setAttribute("width", totalWidth);
        this.borderRect_.setAttribute("height", totalHeight);
    }
    this.size_.width = totalWidth;
    this.size_.height = totalHeight;

    this.positionBorderRect_();
};

/**
 * Create the text input editor widget.
 * @return {!HTMLTextAreaElement} The newly created text input editor.
 * @protected
 */
Blockly.FieldMultilineInput.prototype.widgetCreate_ = function () {
    var div = Blockly.WidgetDiv.DIV;
    var scale = this.workspace_.getScale();

    var htmlInput = /** @type {HTMLTextAreaElement} */ (
        document.createElement("textarea")
    );
    htmlInput.className = "blocklyHtmlInput blocklyHtmlTextAreaInput";
    htmlInput.setAttribute("spellcheck", this.spellcheck_);
    var fontSize = this.getConstants().FIELD_TEXT_FONTSIZE * scale + "pt";
    div.style.fontSize = fontSize;
    htmlInput.style.fontSize = fontSize;
    var borderRadius = Blockly.FieldTextInput.BORDERRADIUS * scale + "px";
    htmlInput.style.borderRadius = borderRadius;

    // textarea의 우측에는 textarea의 padding과 부모 div의 여백이 절반 정도씩 차지하도록 한다.
    // textarea의 padding만 자리잡으면 부모 div의 너비가 너무 작아 textarea가 잘려서 표시되고
    // 부모 div의 여백만 자리잡으면 우측에 공간이 너무 많이 생긴다.
    var paddingRight = this.getRightPadding() * scale;
    var paddingLeft = this.getConstants().FIELD_BORDER_RECT_X_PADDING * scale;
    var paddingY =
        (this.getConstants().FIELD_BORDER_RECT_Y_PADDING * scale) / 2;
    htmlInput.style.padding =
        paddingY +
        "px " +
        paddingRight +
        "px " +
        paddingY +
        "px " +
        paddingLeft +
        "px";
    var lineHeight =
        this.getConstants().FIELD_TEXT_HEIGHT +
        this.getConstants().FIELD_BORDER_RECT_Y_PADDING;
    htmlInput.style.lineHeight = lineHeight * scale + "px";

    // textarea로 입력 시 배경이 투명하면 text로 표시되는 부분이 표시되므로 숨기기 위해 불투명하게 설정.
    htmlInput.style.backgroundColor = "rgba(0, 0, 0, 1)";

    div.appendChild(htmlInput);

    htmlInput.value = htmlInput.defaultValue = this.getEditorText_(this.value_);
    htmlInput.untypedDefaultValue_ = this.value_;
    htmlInput.oldValue_ = null;
    if (Blockly.utils.userAgent.GECKO) {
        // In FF, ensure the browser reflows before resizing to avoid issue #2777.
        setTimeout(this.resizeEditor_.bind(this), 0);
    } else {
        this.resizeEditor_();
    }

    this.bindInputEvents_(htmlInput);

    return htmlInput;
};
