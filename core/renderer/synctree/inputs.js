import * as Blockly from "blockly/core";

Blockly.synctree.StatementInput = function (constants, input) {
    Blockly.synctree.StatementInput.superClass_.constructor.call(
        this,
        constants,
        input
    );

    if (this.connectedBlock) {
        // Find the bottom-most connected block in the stack.
        var block = this.connectedBlock;
        while (block.getNextBlock()) {
            block = block.getNextBlock();
        }
        if (!block.nextConnection) {
            this.height = this.connectedBlockHeight;
            this.connectedBottomNextConnection = true;
        }
    }
};
Blockly.utils.object.inherits(
    Blockly.synctree.StatementInput,
    Blockly.blockRendering.StatementInput
);
