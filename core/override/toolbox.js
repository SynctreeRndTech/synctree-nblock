import * as Blockly from "blockly/core";
/**
 * Positions the zoom controls.
 * It is positioned in the opposite corner to the corner the
 * categories/toolbox starts at.
 * @param {!Blockly.MetricsManager.UiMetrics} metrics The workspace metrics.
 * @param {!Array<!Blockly.utils.Rect>} savedPositions List of rectangles that
 *     are already on the workspace.
 */

Blockly.ZoomControls.prototype.position = function (metrics, savedPositions) {
    // Not yet initialized.
    if (!this.initialized_) {
        return;
    }

    var cornerPosition = Blockly.uiPosition.getCornerOppositeToolbox(
        this.workspace_,
        metrics
    );
    var height = this.SMALL_SPACING_ + 2 * this.HEIGHT_;
    if (this.zoomResetGroup_) {
        height += this.LARGE_SPACING_ + this.HEIGHT_;
    }
    var startRect = Blockly.uiPosition.getStartPositionRect(
        cornerPosition,
        new Blockly.utils.Size(this.WIDTH_, height),
        this.MARGIN_HORIZONTAL_,
        this.MARGIN_VERTICAL_,
        metrics,
        this.workspace_
    );

    var verticalPosition = cornerPosition.vertical;
    var bumpDirection =
        verticalPosition === Blockly.uiPosition.verticalPosition.TOP
            ? Blockly.uiPosition.bumpDirection.DOWN
            : Blockly.uiPosition.bumpDirection.UP;
    var positionRect = Blockly.uiPosition.bumpPositionRect(
        startRect,
        this.MARGIN_VERTICAL_,
        bumpDirection,
        savedPositions
    );

    if (verticalPosition === Blockly.uiPosition.verticalPosition.TOP) {
        var zoomInTranslateY = this.SMALL_SPACING_ + this.HEIGHT_;
        this.zoomInGroup_.setAttribute(
            "transform",
            "translate(0, " + zoomInTranslateY + ")"
        );
        if (this.zoomResetGroup_) {
            var zoomResetTranslateY =
                zoomInTranslateY + this.LARGE_SPACING_ + this.HEIGHT_;
            this.zoomResetGroup_.setAttribute(
                "transform",
                "translate(0, " + zoomResetTranslateY + ")"
            );
        }
    } else {
        var zoomInTranslateY = this.zoomResetGroup_
            ? this.LARGE_SPACING_ + this.HEIGHT_
            : 0;
        this.zoomInGroup_.setAttribute(
            "transform",
            "translate(0, " + zoomInTranslateY + ")"
        );
        var zoomOutTranslateY =
            zoomInTranslateY + this.SMALL_SPACING_ + this.HEIGHT_;
        this.zoomOutGroup_.setAttribute(
            "transform",
            "translate(0, " + zoomOutTranslateY + ")"
        );
    }

    this.top_ = positionRect.top;
    //   this.left_ = positionRect.left;
    this.left_ = positionRect.left;
    this.svgGroup_.setAttribute(
        "transform",
        //   'translate(' + this.left_ + ',' + this.top_ + ')');
        "translate(" + (this.left_ + 15) + ",12)"
    );
};
