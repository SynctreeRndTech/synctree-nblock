import * as Blockly from "blockly/core";

Blockly.synctree.RenderInfo = function (renderer, block) {
    Blockly.synctree.RenderInfo.superClass_.constructor.call(
        this,
        renderer,
        block
    );
    // this.topRow = new Blockly.synctree.TopRow(this.constants_);
    // this.bottomRow = new Blockly.synctree.BottomRow(this.constants_);
    // this.isInline = true;

    // /**
    //  * Whether the block should be rendered as a multi-line block, either because
    //  * it's not inline or because it has been collapsed.
    //  * @type {boolean}
    //  */
    // this.isMultiRow = !block.getInputsInline() || block.isCollapsed();

    // /**
    //  * Whether or not the block has a statement input in one of its rows.
    //  * @type {boolean}
    //  */
    // this.hasStatementInput = block.statementInputCount > 0;

    // /**
    //  * An object with rendering information about the right connection shape.
    //  * @type {Blockly.zelos.RightConnectionShape}
    //  */
    // this.rightSide = this.outputConnection
    //     ? new Blockly.synctree.RightConnectionShape(this.constants_)
    //     : null;
};
Blockly.utils.object.inherits(
    Blockly.synctree.RenderInfo,
    Blockly.blockRendering.RenderInfo
);

/**
 * Get the block renderer in use.
 * @return {!Blockly.synctree.Renderer} The block renderer in use.
 * @package
 */
Blockly.synctree.RenderInfo.prototype.getRenderer = function () {
    return /** @type {!Blockly.synctree.Renderer} */ this.renderer_;
};

/**
 * @override
 */
Blockly.synctree.RenderInfo.prototype.measure = function () {
    // Modifying parent measure method to add `adjustXPosition_`.
    this.createRows_();
    this.addElemSpacing_();
    this.addRowSpacing_();
    // this.adjustXPosition_();
    this.computeBounds_();
    this.alignRowElements_();
    this.finalize_();
};

/**
 * @override
 */
Blockly.synctree.RenderInfo.prototype.addElemSpacing_ = function () {
    var hasExternalInputs = false;
    for (var i = 0, row; (row = this.rows[i]); i++) {
        if (row.hasExternalInput) {
            hasExternalInputs = true;
        }
    }
    for (var i = 0, row; (row = this.rows[i]); i++) {
        var oldElems = row.elements;
        row.elements = [];
        // No spacing needed before the corner on the top row or the bottom row.
        if (row.startsWithElemSpacer()) {
            // There's a spacer before the first element in the row.
            row.elements.push(
                new Blockly.blockRendering.InRowSpacer(
                    this.constants_,
                    this.getInRowSpacing_(null, oldElems[0])
                )
            );
        }
        for (var e = 0; e < oldElems.length - 1; e++) {
            row.elements.push(oldElems[e]);
            var spacing = this.getInRowSpacing_(oldElems[e], oldElems[e + 1]);
            row.elements.push(
                new Blockly.blockRendering.InRowSpacer(this.constants_, spacing)
            );
        }
        row.elements.push(oldElems[oldElems.length - 1]);
        if (row.endsWithElemSpacer()) {
            var spacing = this.getInRowSpacing_(
                oldElems[oldElems.length - 1],
                null
            );
            if (hasExternalInputs && row.hasDummyInput) {
                spacing += this.constants_.TAB_WIDTH;
            }
            // There's a spacer after the last element in the row.
            row.elements.push(
                new Blockly.blockRendering.InRowSpacer(this.constants_, spacing)
            );
        }
    }
};

/**
 * @override
 */
Blockly.synctree.RenderInfo.prototype.getInRowSpacing_ = function (prev, next) {
    if (!prev) {
        // Between an editable field and the beginning of the row.
        if (
            next &&
            Blockly.blockRendering.Types.isField(next) &&
            /** @type Blockly.blockRendering.Field */ next.isEditable
        ) {
            return this.constants_.MEDIUM_PADDING;
        }
        // Inline input at the beginning of the row.
        if (next && Blockly.blockRendering.Types.isInlineInput(next)) {
            return this.constants_.MEDIUM_LARGE_PADDING;
        }
        if (next && Blockly.blockRendering.Types.isStatementInput(next)) {
            return this.constants_.STATEMENT_INPUT_PADDING_LEFT;
        }
        // Anything else at the beginning of the row.
        return this.constants_.LARGE_PADDING;
    }

    // Spacing between a non-input and the end of the row.
    if (!Blockly.blockRendering.Types.isInput(prev) && !next) {
        // Between an editable field and the end of the row.
        if (
            Blockly.blockRendering.Types.isField(prev) &&
            /** @type Blockly.blockRendering.Field */ prev.isEditable
        ) {
            return this.constants_.MEDIUM_PADDING;
        }
        // Padding at the end of an icon-only row to make the block shape clearer.
        if (Blockly.blockRendering.Types.isIcon(prev)) {
            return this.constants_.LARGE_PADDING * 2 + 1;
        }
        if (Blockly.blockRendering.Types.isHat(prev)) {
            return this.constants_.NO_PADDING;
        }
        // Establish a minimum width for a block with a previous or next connection.
        if (Blockly.blockRendering.Types.isPreviousOrNextConnection(prev)) {
            return this.constants_.LARGE_PADDING;
        }
        // Between rounded corner and the end of the row.
        if (Blockly.blockRendering.Types.isLeftRoundedCorner(prev)) {
            return this.constants_.MIN_BLOCK_WIDTH;
        }
        // Between a jagged edge and the end of the row.
        if (Blockly.blockRendering.Types.isJaggedEdge(prev)) {
            return this.constants_.NO_PADDING;
        }
        // Between noneditable fields and icons and the end of the row.
        return this.constants_.LARGE_PADDING;
    }

    // Between inputs and the end of the row.
    if (Blockly.blockRendering.Types.isInput(prev) && !next) {
        if (Blockly.blockRendering.Types.isExternalInput(prev)) {
            return this.constants_.NO_PADDING;
        } else if (Blockly.blockRendering.Types.isInlineInput(prev)) {
            return this.constants_.LARGE_PADDING;
        } else if (Blockly.blockRendering.Types.isStatementInput(prev)) {
            return this.constants_.NO_PADDING;
        }
    }

    // Spacing between a non-input and an input.
    if (
        !Blockly.blockRendering.Types.isInput(prev) &&
        next &&
        Blockly.blockRendering.Types.isInput(next)
    ) {
        // Between an editable field and an input.
        if (
            Blockly.blockRendering.Types.isField(prev) &&
            /** @type Blockly.blockRendering.Field */ prev.isEditable
        ) {
            if (Blockly.blockRendering.Types.isInlineInput(next)) {
                return this.constants_.SMALL_PADDING;
            } else if (Blockly.blockRendering.Types.isExternalInput(next)) {
                return this.constants_.SMALL_PADDING;
            }
        } else {
            if (Blockly.blockRendering.Types.isInlineInput(next)) {
                return this.constants_.MEDIUM_LARGE_PADDING;
            } else if (Blockly.blockRendering.Types.isExternalInput(next)) {
                return this.constants_.MEDIUM_LARGE_PADDING;
            } else if (Blockly.blockRendering.Types.isStatementInput(next)) {
                return this.constants_.LARGE_PADDING;
            }
        }
        return this.constants_.LARGE_PADDING - 1;
    }

    // Spacing between an icon and an icon or field.
    if (
        Blockly.blockRendering.Types.isIcon(prev) &&
        next &&
        !Blockly.blockRendering.Types.isInput(next)
    ) {
        return this.constants_.LARGE_PADDING;
    }

    // Spacing between an inline input and a field.
    if (
        Blockly.blockRendering.Types.isInlineInput(prev) &&
        next &&
        Blockly.blockRendering.Types.isField(next)
    ) {
        // Editable field after inline input.
        if (/** @type Blockly.blockRendering.Field */ next.isEditable) {
            return this.constants_.MEDIUM_PADDING;
        } else {
            // Noneditable field after inline input.
            return this.constants_.LARGE_PADDING;
        }
    }

    if (Blockly.blockRendering.Types.isLeftSquareCorner(prev) && next) {
        // Spacing between a hat and a corner
        if (Blockly.blockRendering.Types.isHat(next)) {
            return this.constants_.NO_PADDING;
        }
        // Spacing between a square corner and a previous or next connection
        if (
            Blockly.blockRendering.Types.isPreviousConnection(next) ||
            Blockly.blockRendering.Types.isNextConnection(next)
        ) {
            return next.notchOffset;
        }
    }

    // Spacing between a rounded corner and a previous or next connection.
    if (Blockly.blockRendering.Types.isLeftRoundedCorner(prev) && next) {
        return next.notchOffset - this.constants_.CORNER_RADIUS;
    }

    // Spacing between two fields of the same editability.
    if (
        Blockly.blockRendering.Types.isField(prev) &&
        next &&
        Blockly.blockRendering.Types.isField(next) &&
        /** @type Blockly.blockRendering.Field */ prev.isEditable ==
            /** @type Blockly.blockRendering.Field */ next.isEditable
    ) {
        return this.constants_.LARGE_PADDING;
    }

    // Spacing between anything and a jagged edge.
    if (next && Blockly.blockRendering.Types.isJaggedEdge(next)) {
        return this.constants_.LARGE_PADDING;
    }

    return this.constants_.MEDIUM_PADDING;
};

/**
 * @override
 */
Blockly.synctree.RenderInfo.prototype.getSpacerRowHeight_ = function (
    prev,
    next
) {
    // If we have an empty block add a spacer to increase the height.
    if (
        Blockly.blockRendering.Types.isTopRow(prev) &&
        Blockly.blockRendering.Types.isBottomRow(next)
    ) {
        return this.constants_.EMPTY_BLOCK_SPACER_HEIGHT;
    }
    // Top and bottom rows act as a spacer so we don't need any extra padding.
    if (
        Blockly.blockRendering.Types.isTopRow(prev) ||
        Blockly.blockRendering.Types.isBottomRow(next)
    ) {
        return this.constants_.NO_PADDING;
    }
    if (prev.hasExternalInput && next.hasExternalInput) {
        return this.constants_.LARGE_PADDING;
    }
    if (!prev.hasStatement && next.hasStatement) {
        return this.constants_.BETWEEN_STATEMENT_PADDING_Y;
    }
    if (prev.hasStatement && next.hasStatement) {
        return this.constants_.LARGE_PADDING;
    }
    if (prev.hasDummyInput || next.hasDummyInput) {
        return this.constants_.LARGE_PADDING;
    }
    return this.constants_.MEDIUM_PADDING;
};

/**
 * @override
 */
Blockly.synctree.RenderInfo.prototype.getElemCenterline_ = function (
    row,
    elem
) {
    if (Blockly.blockRendering.Types.isSpacer(elem)) {
        return row.yPos + elem.height / 2;
    }
    if (Blockly.blockRendering.Types.isBottomRow(row)) {
        var baseline = row.yPos + row.height - row.descenderHeight;
        if (Blockly.blockRendering.Types.isNextConnection(elem)) {
            return baseline + elem.height / 2;
        }
        return baseline - elem.height / 2;
    }
    if (Blockly.blockRendering.Types.isTopRow(row)) {
        if (Blockly.blockRendering.Types.isHat(elem)) {
            return row.capline - elem.height / 2;
        }
        return row.capline + elem.height / 2;
    }
    if (Blockly.blockRendering.Types.isIcon(elem)) {
        return row.yPos + this.constants_.LARGE_PADDING + 1;
    }

    var result = row.yPos;
    if (Blockly.blockRendering.Types.isField(elem)) {
        result += elem.height / 2;
        if (
            (row.hasInlineInput || row.hasStatement) &&
            elem.height + this.constants_.TALL_INPUT_FIELD_OFFSET_Y <=
                row.height
        ) {
            result += this.constants_.TALL_INPUT_FIELD_OFFSET_Y;
        }
    } else if (Blockly.blockRendering.Types.isInlineInput(elem)) {
        result += elem.height / 2;
    } else {
        result += row.height / 2;
    }
    return result;
};

/**
 * @override
 */
Blockly.synctree.RenderInfo.prototype.finalize_ = function () {
    // Performance note: this could be combined with the draw pass, if the time
    // that this takes is excessive.  But it shouldn't be, because it only
    // accesses and sets properties that already exist on the objects.
    var widestRowWithConnectedBlocks = 0;
    var yCursor = 0;
    for (var i = 0, row; (row = this.rows[i]); i++) {
        row.yPos = yCursor;
        row.xPos = this.startX;
        yCursor += row.height;

        widestRowWithConnectedBlocks = Math.max(
            widestRowWithConnectedBlocks,
            row.widthWithConnectedBlocks
        );
        // Add padding to the bottom row if block height is less than minimum
        var heightWithoutHat = yCursor - this.topRow.ascenderHeight;
        if (
            row == this.bottomRow &&
            heightWithoutHat < this.constants_.MIN_BLOCK_HEIGHT
        ) {
            // But the hat height shouldn't be part of this.
            var diff = this.constants_.MIN_BLOCK_HEIGHT - heightWithoutHat;
            this.bottomRow.height += diff;
            yCursor += diff;
        }
        this.recordElemPositions_(row);
    }
    if (
        this.outputConnection &&
        this.block_.nextConnection &&
        this.block_.nextConnection.isConnected()
    ) {
        // Include width of connected block in value to stack width measurement.
        widestRowWithConnectedBlocks = Math.max(
            widestRowWithConnectedBlocks,
            this.block_.nextConnection.targetBlock().getHeightWidth().width
        );
    }

    this.bottomRow.baseline = yCursor - this.bottomRow.descenderHeight;
    this.widthWithChildren = widestRowWithConnectedBlocks + this.startX;

    this.height = yCursor;
    this.startY = this.topRow.capline;
};
