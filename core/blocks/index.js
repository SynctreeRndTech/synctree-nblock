import * as Blockly from "blockly/core";
Blockly.Blocks["lists_create_with_item"] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(20);
        this.appendDummyInput().appendField("item");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("Add an item to the list.");
        this.contextMenu = false;
    },
};

Blockly.Blocks["lists_create_with_container"] = {
    /**
     * Mutator block for list container.
     * @this {Blockly.Block}
     */
    init: function () {
        this.setStyle("list_blocks");
        this.appendDummyInput().appendField("list");
        this.appendStatementInput("STACK");
        this.setTooltip(
            "Add, remove, or reorder sections to reconfigure this list block."
        );
        this.contextMenu = false;
    },
};
