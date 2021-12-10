import * as Blockly from "blockly/core";
import _ from "lodash";

/**
 * Copy a block or workspace comment onto the local clipboard.
 * @param {ClipboardEvent} e Block or Workspace Comment to be copied.
 * @param {!Blockly.ICopyable} toCopy Block or Workspace Comment to be copied.
 * @package
 */
Blockly.copy = function (e, toCopy) {
    const data = toCopy.toCopyData(),
        cannotCopy = new Blockly.synctreeUtil.cannotCopy(),
        cannotCopyBlocks = cannotCopy.getBlocks();

    if (data) {
        if (
            cannotCopyBlocks.length > 0 &&
            _.difference(cannotCopyBlocks, _.keys(data.typeCounts)).length !==
                cannotCopyBlocks.length
        ) {
            cannotCopy.fireCopy();
            return;
        }
        const xmlText = Blockly.Xml.domToPrettyText(data.xml);

        // console.log("XML (copy):", navigator);
        e.preventDefault();
        e.clipboardData.setData("text/plain", xmlText);
        // console.log(e.clipboardData.getData("text"));

        // navigator.clipboard.writeText(xmlText);

        // Blockly.clipboardXml_ = data.xml;
        // Blockly.clipboardSource_ = data.source;
        // Blockly.clipboardTypeCounts_ = data.typeCounts;
    }
};

/**
 * Paste a block or workspace comment on to the main workspace.
 * @param {Blockly.WorkspaceSvg} workspace Block or Workspace Comment to be copied.
 * @param {ClipboardEvent} e Block or Workspace Comment to be copied.
 * @return {boolean} True if the paste was successful, false otherwise.
 * @package
 */
Blockly.paste = function (workspace, e) {
    e.stopPropagation();
    e.preventDefault();

    const xmlText = e.clipboardData.getData("Text"),
        domParser = new DOMParser(),
        dom = domParser.parseFromString(xmlText, "text/xml"),
        pasteBefore = new Blockly.synctreeUtil.beforePaste();

    try {
        // check text is xml
        if (dom.getElementsByTagName("parsererror").length > 0) {
            console.error(
                "Blockly.paste error::",
                dom.getElementsByTagName("parsererror")
            );
            return false;
        }
        if (xmlText) {
            const xmlDom = Blockly.Xml.textToDom(xmlText);
            // const workspace = Blockly.getMainWorkspace();
            pasteBefore.pasteBeforeAction(xmlText);
            const m = workspace.getMetrics();

            xmlDom.setAttribute("x", m.viewLeft + 250);
            xmlDom.setAttribute("y", m.viewTop + 250);
            // const xmlBlock = Blockly.Xml.domToBlock(xmlDom, workspace);
            Blockly.Events.setGroup(true);
            workspace.paste(xmlDom);

            Blockly.Events.setGroup(false);
            return true;
        }
        return false;
    } catch (error) {
        // invalidate blockly.xml
        console.error("Blockly.paste error::", error);
        return false;
    }

    // if (!Blockly.clipboardXml_) {
    //     return false;
    // }
    // Pasting always pastes to the main workspace, even if the copy
    // started in a flyout workspace.
    // var workspace = Blockly.clipboardSource_;
    // if (workspace.isFlyout) {
    //     workspace = workspace.targetWorkspace;
    // }
    // if (
    //     Blockly.clipboardTypeCounts_ &&
    //     workspace.isCapacityAvailable(Blockly.clipboardTypeCounts_)
    // ) {
    //     Blockly.Events.setGroup(true);
    //     workspace.paste(Blockly.clipboardXml_);
    //     Blockly.Events.setGroup(false);
    //     return true;
    // }
    // return false;
};
// function checkRegisteredCustomUtilBlock()
