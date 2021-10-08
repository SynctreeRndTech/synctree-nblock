import * as Blockly from "blockly/core";

Blockly.synctree = {};
Blockly.synctree.ConstantProvider = function () {
    Blockly.synctree.ConstantProvider.superClass_.constructor.call(this);
    this.GRID_UNIT = 4;
    this.CORNER_RADIUS = 1 * this.GRID_UNIT;
    this.TALL_INPUT_FIELD_OFFSET_Y = 8;

    this.TAB_OFFSET_FROM_TOP = 5;
    this.TAB_HEIGHT = 15;
    this.TAB_WIDTH = 8;
    this.TAB_VERTICAL_OVERLAP = 7.5;

    this.NOTCH_WIDTH = 6 * this.GRID_UNIT;
    this.NOTCH_HEIGHT = 1.25 * this.GRID_UNIT;
    this.NOTCH_OFFSET_LEFT = 2.5 * this.GRID_UNIT;

    this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT;
    this.STATEMENT_BOTTOM_SPACER = 0; // -this.NOTCH_HEIGHT;
    this.STATEMENT_INPUT_SPACER_MIN_WIDTH = 40 * this.GRID_UNIT;
    this.STATEMENT_INPUT_PADDING_LEFT = 4 * this.GRID_UNIT;

    this.BETWEEN_STATEMENT_PADDING_Y = 5;
    this.TOP_ROW_MIN_HEIGHT = 5;
    this.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = 11;
    this.BOTTOM_ROW_MIN_HEIGHT = 5;
    this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 11; // bottom row height
    this.SPACER_DEFAULT_HEIGHT = 16;

    this.MIN_BLOCK_WIDTH = 6 * this.GRID_UNIT;
    this.MIN_BLOCK_HEIGHT = 6 * this.GRID_UNIT;
    this.EMPTY_BLOCK_SPACER_HEIGHT = 16;
    this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH = 12 * this.GRID_UNIT;

    this.EMPTY_INLINE_INPUT_HEIGHT = this.TAB_HEIGHT + 11; // empty block height
    this.EMPTY_INLINE_INPUT_PADDING = 4 * this.GRID_UNIT;
    this.EMPTY_STATEMENT_INPUT_HEIGHT = 6 * this.GRID_UNIT;
    this.EXTERNAL_VALUE_INPUT_PADDING = 2;
    this.DUMMY_INPUT_MIN_HEIGHT = this.TAB_HEIGHT;
    this.DUMMY_INPUT_SHADOW_MIN_HEIGHT = this.TAB_HEIGHT;
    this.CURSOR_RADIUS = 5;

    this.FIELD_TEXT_BASELINE_CENTER = false;

    this.FIELD_BORDER_RECT_COLOUR = "#000";

    this.FIELD_BORDER_RECT_RADIUS = this.CORNER_RADIUS * 3;
    this.FIELD_BORDER_RECT_X_PADDING = 8;
    this.FIELD_BORDER_RECT_Y_PADDING = 4;
    this.FIELD_BORDER_RECT_HEIGHT = 4 * this.GRID_UNIT;
    this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 4 * this.GRID_UNIT;

    this.FIELD_TEXT_FONTSIZE = 11; // (11pt=14px)
    this.FIELD_TEXT_FONTWEIGHT = "normal";
    this.FIELD_TEXT_FONTFAMILY = '"Roboto", "Helvetica", "Arial", sans-serif';

    this.SELECTED_GLOW_COLOUR = "#fff";

    this.SELECTED_GLOW_SIZE = 0.5;

    this.REPLACEMENT_GLOW_COLOUR = "#fff";

    this.REPLACEMENT_GLOW_SIZE = 2;

    this.selectedGlowFilterId = "";

    this.selectedGlowFilter_ = null;

    this.replacementGlowFilterId = "";

    this.replacementGlowFilter_ = null;
};

Blockly.synctree.ConstantProvider.prototype.init = function () {
    /**
     * An object containing sizing and path information about notches.
     * @type {!Object}
     */
    this.NOTCH = this.makeNotch();

    /**
     * An object containing sizing and path information about start hats
     * @type {!Object}
     */
    this.START_HAT = this.makeStartHat();

    /**
     * An object containing sizing and path information about puzzle tabs.
     * @type {!Object}
     */
    this.PUZZLE_TAB = this.makePuzzleTab();

    /**
     * An object containing sizing and path information about inside corners
     * @type {!Object}
     */
    this.INSIDE_CORNERS = this.makeInsideCorners();

    /**
     * An object containing sizing and path information about outside corners.
     * @type {!Object}
     */
    this.OUTSIDE_CORNERS = this.makeOutsideCorners();
};

Blockly.utils.object.inherits(
    Blockly.synctree.ConstantProvider,
    Blockly.blockRendering.ConstantProvider
);

/* custom puzzle tab start */
/**
 * @override
 */
Blockly.synctree.ConstantProvider.prototype.makePuzzleTab = function () {
    var width = this.TAB_WIDTH; // 8
    var height = this.TAB_HEIGHT; // 15

    // The main path for the puzzle tab is made out of a few curves (c and s).
    // Those curves are defined with relative positions.  The 'up' and 'down'
    // versions of the paths are the same, but the Y sign flips.  Forward and back
    // are the signs to use to move the cursor in the direction that the path is
    // being drawn.
    function makeMainPath(up) {
        var forward = up ? -1 : 1;
        var back = -forward;

        var overlap = 7.5; // 2.5
        var halfHeight = height / 2;
        var control1Y = 0; // halfHeight + overlap;
        var control2Y = 0; // halfHeight + 0.5;
        var control3Y = -overlap; // 7.5 // 2.5

        var endPoint1 = Blockly.utils.svgPaths.point(
            -width,
            forward * halfHeight
        );
        var endPoint2 = Blockly.utils.svgPaths.point(
            width,
            forward * halfHeight
        );

        return (
            Blockly.utils.svgPaths.curve("c", [
                Blockly.utils.svgPaths.point(0, forward * control1Y),
                Blockly.utils.svgPaths.point(-width, back * control2Y),
                endPoint1,
            ]) +
            Blockly.utils.svgPaths.curve("s", [
                Blockly.utils.svgPaths.point(width, back * control3Y),
                endPoint2,
            ])
        );
    }
    // new    // c 0,0  -8,0  -8,-7.5  s 8,-7.5  8,-7.5
    // origin // c 0,-10  -8,8  -8,-7.5  s 8,2.5  8,-7.5
    var pathUp = makeMainPath(true);
    // new    // c 0,0  -8,-0  -8,7.5  s 8,7.5  8,7.5
    // origin // c 0,10  -8,-8  -8,7.5  s 8,-2.5  8,7.5
    var pathDown = makeMainPath(false);

    return {
        type: this.SHAPES.PUZZLE,
        width: width,
        height: height,
        pathDown: pathDown,
        pathUp: pathUp,
    };
};
/* custom puzzle tab end */

/* custom notch start */
/**
 * @override
 */
Blockly.synctree.ConstantProvider.prototype.makeNotch = function () {
    var width = this.NOTCH_WIDTH;
    var height = this.NOTCH_HEIGHT;

    var innerWidth = width / 3;
    var curveWidth = innerWidth / 3;

    var halfHeight = height / 2;
    var quarterHeight = halfHeight / 2;

    function makeMainPath(dir) {
        return (
            Blockly.utils.svgPaths.curve("c", [
                Blockly.utils.svgPaths.point((dir * curveWidth) / 2, 0),
                Blockly.utils.svgPaths.point(
                    (dir * curveWidth * 3) / 4,
                    quarterHeight / 2
                ),
                Blockly.utils.svgPaths.point(dir * curveWidth, quarterHeight),
            ]) +
            Blockly.utils.svgPaths.line([
                Blockly.utils.svgPaths.point(dir * curveWidth, halfHeight),
            ]) +
            Blockly.utils.svgPaths.curve("c", [
                Blockly.utils.svgPaths.point(
                    (dir * curveWidth) / 4,
                    quarterHeight / 2
                ),
                Blockly.utils.svgPaths.point(
                    (dir * curveWidth) / 2,
                    quarterHeight
                ),
                Blockly.utils.svgPaths.point(dir * curveWidth, quarterHeight),
            ]) +
            Blockly.utils.svgPaths.lineOnAxis("h", dir * innerWidth) +
            Blockly.utils.svgPaths.curve("c", [
                Blockly.utils.svgPaths.point((dir * curveWidth) / 2, 0),
                Blockly.utils.svgPaths.point(
                    (dir * curveWidth * 3) / 4,
                    -(quarterHeight / 2)
                ),
                Blockly.utils.svgPaths.point(dir * curveWidth, -quarterHeight),
            ]) +
            Blockly.utils.svgPaths.line([
                Blockly.utils.svgPaths.point(dir * curveWidth, -halfHeight),
            ]) +
            Blockly.utils.svgPaths.curve("c", [
                Blockly.utils.svgPaths.point(
                    (dir * curveWidth) / 4,
                    -(quarterHeight / 2)
                ),
                Blockly.utils.svgPaths.point(
                    (dir * curveWidth) / 2,
                    -quarterHeight
                ),
                Blockly.utils.svgPaths.point(dir * curveWidth, -quarterHeight),
            ])
        );
    }

    var pathLeft = makeMainPath(1);
    var pathRight = makeMainPath(-1);

    return {
        type: this.SHAPES.NOTCH,
        width: width,
        height: height,
        pathLeft: pathLeft,
        pathRight: pathRight,
    };
};
/**
 * @override
 */
Blockly.synctree.ConstantProvider.prototype.makeInsideCorners = function () {
    var radius = this.CORNER_RADIUS;

    var innerTopLeftCorner = Blockly.utils.svgPaths.arc(
        "a",
        "0 0,0",
        radius,
        Blockly.utils.svgPaths.point(-radius, radius)
    );

    var innerTopRightCorner = Blockly.utils.svgPaths.arc(
        "a",
        "0 0,1",
        radius,
        Blockly.utils.svgPaths.point(-radius, radius)
    );

    var innerBottomLeftCorner = Blockly.utils.svgPaths.arc(
        "a",
        "0 0,0",
        radius,
        Blockly.utils.svgPaths.point(radius, radius)
    );

    var innerBottomRightCorner = Blockly.utils.svgPaths.arc(
        "a",
        "0 0,1",
        radius,
        Blockly.utils.svgPaths.point(radius, radius)
    );

    return {
        width: radius,
        height: radius,
        pathTop: innerTopLeftCorner,
        pathBottom: innerBottomLeftCorner,
        rightWidth: radius,
        rightHeight: radius,
        pathTopRight: innerTopRightCorner,
        pathBottomRight: innerBottomRightCorner,
    };
};
/**
 * @override
 */
Blockly.synctree.ConstantProvider.prototype.makeOutsideCorners = function () {
    var radius = this.CORNER_RADIUS;
    /**
     * SVG path for drawing the rounded top-left corner.
     * @const
     */
    var topLeft =
        Blockly.utils.svgPaths.moveBy(0, radius) +
        Blockly.utils.svgPaths.arc(
            "a",
            "0 0,1",
            radius,
            Blockly.utils.svgPaths.point(radius, -radius)
        );

    /**
     * SVG path for drawing the rounded top-right corner.
     * @const
     */
    var topRight = Blockly.utils.svgPaths.arc(
        "a",
        "0 0,1",
        radius,
        Blockly.utils.svgPaths.point(radius, radius)
    );

    /**
     * SVG path for drawing the rounded bottom-left corner.
     * @const
     */
    var bottomLeft = Blockly.utils.svgPaths.arc(
        "a",
        "0 0,1",
        radius,
        Blockly.utils.svgPaths.point(-radius, -radius)
    );

    /**
     * SVG path for drawing the rounded bottom-right corner.
     * @const
     */
    var bottomRight = Blockly.utils.svgPaths.arc(
        "a",
        "0 0,1",
        radius,
        Blockly.utils.svgPaths.point(-radius, radius)
    );

    return {
        topLeft: topLeft,
        topRight: topRight,
        bottomRight: bottomRight,
        bottomLeft: bottomLeft,
        rightHeight: radius,
    };
};
/* custom notch end */

Blockly.synctree.ConstantProvider.prototype.getCSS_ = function (selector) {
    return [
        /* eslint-disable indent */
        // Text.
        selector + " .blocklyText, ",
        selector + " .blocklyFlyoutLabelText {",
        "font-family: " + this.FIELD_TEXT_FONTFAMILY + ";",
        "font-size: " + this.FIELD_TEXT_FONTSIZE + "pt;",
        "font-weight: " + this.FIELD_TEXT_FONTWEIGHT + ";",
        "fill: #fff;",
        "}",

        // Fields.
        selector + " .blocklyNonEditableText>text,",
        selector + " .blocklyEditableText>text {",
        "font-family: " + this.FIELD_TEXT_FONTFAMILY + ";",
        "font-weight: " + this.FIELD_TEXT_FONTWEIGHT + ";",
        "fill-opacity: 0.9;",
        "}",
        selector + " .blocklyNonEditableText>rect,",
        selector + " .blocklyEditableText>rect {",
        "fill: " + this.FIELD_BORDER_RECT_COLOUR + ";",
        "fill-opacity: 0.15;",
        "stroke: #000;",
        "stroke-opacity: .1;",
        "}",

        // Editable field hover.
        selector + " .blocklyEditableText:not(.editing):hover>rect {",
        "fill-opacity: 0.25;",
        "}",

        // Text field input.
        selector + " .blocklyHtmlInput {",
        "font-family: " + this.FIELD_TEXT_FONTFAMILY + ";",
        "font-weight: " + this.FIELD_TEXT_FONTWEIGHT + ";",
        "color: rgba(255,255,255,0.7);",
        "background-color: rgba(0,0,0,0.75);",
        // "border-radius: 12px !important;",
        "border-radius: 1em !important;",
        "letter-spacing: 0.01071em;",
        "}",

        // Selection highlight.
        selector + " .blocklySelected>.blocklyPath {",
        "stroke: #fff;",
        "stroke-opacity: .9;",
        "stroke-width: 2;",
        "}",

        // Connection highlight.
        selector + " .blocklyHighlightedConnectionPath {",
        "stroke: #fff;",
        "}",

        // Replaceable highlight.
        selector + " .blocklyReplaceable .blocklyPath {",
        "fill-opacity: .5;",
        "}",
        selector + " .blocklyReplaceable .blocklyPathLight,",
        selector + " .blocklyReplaceable .blocklyPathDark {",
        "display: none;",
        "}",

        // Bubbles.
        selector + " .blocklyText.blocklyBubbleText {",
        "fill: #fff;",
        "fill-opacity: .75;",
        "}",

        // scroll.
        " .blocklyScrollbarHandle,",
        " .blocklyFlyout .blocklyScrollbarHandle {",
        "fill: #575c66;",
        "fill-opacity: 0.7;",
        "}",

        " .blocklyScrollbarBackground:hover + .blocklyScrollbarHandle,",
        " .blocklyScrollbarHandle:hover,",
        " .blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,",
        " .blocklyFlyout .blocklyScrollbarHandle:hover {",
        "fill: #575c66;",
        "fill-opacity: 0.9;",
        "}",

        // Flyout labels.
        /*
        selector + " .blocklyFlyoutLabelText {",
        "fill: #fff;",
        "}",

        // Insertion marker.
        selector + " .blocklyInsertionMarker>.blocklyPath {",
        "fill-opacity: " + this.INSERTION_MARKER_OPACITY + ";",
        "stroke: none",
        "}",
        /* eslint-enable indent */
    ];
};
