import * as Blockly from "blockly/core";
import _ from "lodash";

const cannotCopyOriginal = function () {};

cannotCopyOriginal.prototype.getBlocks = () => [];
cannotCopyOriginal.prototype.fireCopy = () => {
    console.log("cannot copy!");
};

const beforePasteOriginal = function () {};

beforePasteOriginal.prototype.pasteBeforeAction = (_xmlDom) => {
    console.log("pasteBefore fired");
};

Blockly.synctreeUtil = {};

Blockly.synctreeUtil.cannotCopy = function () {};
Blockly.synctreeUtil.cannotCopy.prototype = new cannotCopyOriginal();
Blockly.synctreeUtil.cannotCopy.prototype.constructor =
    Blockly.synctreeUtil.cannotCopy;

// Blockly.synctreeUtil.cannotCopy.prototype.fireCopy = () => {
//     alert("cannot copy this block!");
// };

Blockly.synctreeUtil.beforePaste = function () {};
Blockly.synctreeUtil.beforePaste.prototype = new beforePasteOriginal();
Blockly.synctreeUtil.beforePaste.prototype.constructor =
    Blockly.synctreeUtil.beforePaste;

// Blockly.synctreeUtil.beforePaste.prototype.pasteBeforeAction = (xmlDom) => {
//     console.log("pasteBefore fired", xmlDom);
// };

/**
 * Copy a block or workspace comment onto the local clipboard.
 * @param {!Blockly.ICopyable} toCopy Block or Workspace Comment to be copied.
 * @package
 */
Blockly.copy = function (toCopy) {
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

        // console.log("XML (copy):", xmlText);
        navigator.clipboard.writeText(xmlText);

        // Blockly.clipboardXml_ = data.xml;
        // Blockly.clipboardSource_ = data.source;
        // Blockly.clipboardTypeCounts_ = data.typeCounts;
    }
};

/**
 * Paste a block or workspace comment on to the main workspace.
 * @return {boolean} True if the paste was successful, false otherwise.
 * @package
 */
Blockly.paste = async function () {
    const xmlText = await navigator.clipboard.readText(),
        domParser = new DOMParser(),
        dom = domParser.parseFromString(xmlText, "text/xml"),
        pasteBefore = new Blockly.synctreeUtil.beforePaste();

    try {
        // check text is xml
        if (dom.getElementsByTagName("parsererror").length > 0) {
            return false;
        }
        if (xmlText) {
            const xmlDom = Blockly.Xml.textToDom(xmlText);
            const workspace = Blockly.getMainWorkspace();
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
