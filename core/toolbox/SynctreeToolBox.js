import * as Blockly from "blockly/core";

class CustomCategory extends Blockly.ToolboxCategory {
    /**
     * Constructor for a custom category.
     * @override
     */
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }
    /** @override */
    addColourBorder_(colour) {
        this.rowDiv_.style.borderColor = `rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) ${colour}`;
        if (this.level_ > 0) {
            this.rowDiv_.style.marginLeft = `${10 + 19 * this.level_}px`;
            this.rowDiv_.style.paddingLeft = 0;
        }
    }
    /** @override */
    setSelected(isSelected) {
        // We do not store the label span on the category, so use getElementsByClassName.
        const labelDom =
            this.rowDiv_.getElementsByClassName("blocklyTreeLabel")[0];

        if (isSelected) {
            // Change the background color of the div to white.
            this.rowDiv_.style.backgroundColor = this.colour_ + "75"; // opacity
            // Set the colour of the text to the colour of the category.
            // labelDom.style.color = this.colour_;
            labelDom.style.color = "white";
        } else {
            // Set the background back to the original colour.
            // this.rowDiv_.style.backgroundColor = this.colour_;
            this.rowDiv_.style.backgroundColor = "transparent";
            // Set the text back to white.
            labelDom.style.color = "unset";
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(
            /** @type {!Element} */ (this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED,
            isSelected
        );
    }
    // /** @override */
    // setDisabled(isDisabled) {
    //     console.log("setDisabled", isDisabled);
    // }
    // /** @override */
    // setVisible_(isVisible) {
    //     console.log("setVisible_", isVisible);
    // }
    // /** @override */
    // updateFlyoutContents(contents) {
    //     console.log("updateFlyoutContents", contents);
    // }
    // onClick(e) {
    //     console.log("onClick", e);
    // }
}

class CustomCollapsibleCategory extends Blockly.CollapsibleToolboxCategory {
    /**
     * Constructor for a custom category.
     * @override
     */
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
        // this.expanded_ = true;
    }
    /** @override */
    addColourBorder_(colour) {
        // this.rowDiv_.style.backgroundColor = colour;

        this.rowDiv_.style.borderColor = `rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) ${colour}`;
        if (this.level_ > 0) {
            this.rowDiv_.style.marginLeft = `${10 + 19 * this.level_}px`;
            this.rowDiv_.style.paddingLeft = 0;
        }
    }
    /** @override */
    setSelected(isSelected) {
        // We do not store the label span on the category, so use getElementsByClassName.
        const labelDom =
            this.rowDiv_.getElementsByClassName("blocklyTreeLabel")[0];
        if (isSelected) {
            // Change the background color of the div to white.
            this.rowDiv_.style.backgroundColor = this.colour_ + "75"; // opacity
            // Set the colour of the text to the colour of the category.
            // labelDom.style.color = this.colour_;
            labelDom.style.color = "white";
        } else {
            // Set the background back to the original colour.
            // this.rowDiv_.style.backgroundColor = this.colour_;
            this.rowDiv_.style.backgroundColor = "transparent";
            // Set the text back to white.
            labelDom.style.color = "unset";
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(
            /** @type {!Element} */ (this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED,
            isSelected
        );
    }
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory,
    true
);
Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.CollapsibleToolboxCategory.registrationName,
    CustomCollapsibleCategory,
    true
);
