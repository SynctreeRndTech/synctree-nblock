import * as Blockly from "blockly/core";

Blockly.synctree.TopRow = function (constants) {
    Blockly.synctree.TopRow.superClass_.constructor.call(this, constants);
};
Blockly.utils.object.inherits(
    Blockly.synctree.TopRow,
    Blockly.blockRendering.TopRow
);

/**
 * @override
 */
Blockly.synctree.TopRow.prototype.endsWithElemSpacer = function () {
    return false;
};

/**
 * Render a round corner unless the block has an output connection.
 * @override
 */
Blockly.synctree.TopRow.prototype.hasLeftSquareCorner = function (block) {
    var hasHat =
        (block.hat ? block.hat === "cap" : this.constants_.ADD_START_HATS) &&
        !block.outputConnection &&
        !block.previousConnection;
    return !!block.outputConnection || hasHat;
};

/**
 * Render a round corner unless the block has an output connection.
 * @override
 */
Blockly.synctree.TopRow.prototype.hasRightSquareCorner = function (block) {
    return (
        !!block.outputConnection &&
        !block.statementInputCount &&
        !block.nextConnection
    );
};

/**
 * An object containing information about what elements are in the bottom row of
 * a block as well as spacing information for the top row.
 * Elements in a bottom row can consist of corners, spacers and next
 * connections.
 * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
 *   constants provider.
 * @package
 * @constructor
 * @extends {Blockly.blockRendering.BottomRow}
 */
Blockly.synctree.BottomRow = function (constants) {
    Blockly.synctree.BottomRow.superClass_.constructor.call(this, constants);
};
Blockly.utils.object.inherits(
    Blockly.synctree.BottomRow,
    Blockly.blockRendering.BottomRow
);

/**
 * @override
 */
Blockly.synctree.BottomRow.prototype.endsWithElemSpacer = function () {
    return false;
};

/**
 * Render a round corner unless the block has an output connection.
 * @override
 */
Blockly.synctree.BottomRow.prototype.hasLeftSquareCorner = function (block) {
    return !!block.outputConnection;
};

/**
 * Render a round corner unless the block has an output connection.
 * @override
 */
Blockly.synctree.BottomRow.prototype.hasRightSquareCorner = function (block) {
    return (
        !!block.outputConnection &&
        !block.statementInputCount &&
        !block.nextConnection
    );
};
