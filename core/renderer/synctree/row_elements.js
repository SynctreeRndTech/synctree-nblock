import * as Blockly from "blockly/core";

Blockly.synctree.RightConnectionShape = function (constants) {
    Blockly.synctree.RightConnectionShape.superClass_.constructor.call(
        this,
        constants
    );
    this.type |= Blockly.blockRendering.Types.getType("RIGHT_CONNECTION");
    // Size is dynamic
    this.height = 0;
    this.width = 0;
};
Blockly.utils.object.inherits(
    Blockly.synctree.RightConnectionShape,
    Blockly.blockRendering.Measurable
);
