import * as Blockly from "blockly/core";

/**
 * Converts XML representing a block into text that can be stored in the
 *    content array.
 * @param {!Element} xml An XML tree defining the block and any
 *    connected child blocks.
 * @return {string} Text representing the XML tree, cleaned of all unnecessary
 * attributes.
 * @private
 */
Blockly.Trashcan.prototype.cleanBlockXML_ = function (xml) {
    const xmlBlock = xml.cloneNode(true);
    let node = xmlBlock;
    let collapsed = false;
    while (node) {
        // Things like text inside tags are still treated as nodes, but they
        // don't have attributes (or the removeAttribute function) so we can
        // skip removing attributes from them.
        if (node.removeAttribute) {
            node.removeAttribute("x");
            node.removeAttribute("y");
            node.removeAttribute("id");
            node.removeAttribute("disabled");
            if (node.nodeName === "comment") {
                // Future proof just in case.
                node.removeAttribute("h");
                node.removeAttribute("w");
                node.removeAttribute("pinned");
            }
        }
        if (node.setAttribute && !collapsed) {
            node.setAttribute("collapsed", true);
            collapsed = true;
        }

        // Try to go down the tree
        var nextNode = node.firstChild || node.nextSibling;
        // If we can't go down, try to go back up the tree.
        if (!nextNode) {
            nextNode = node.parentNode;
            while (nextNode) {
                // We are valid again!
                if (nextNode.nextSibling) {
                    nextNode = nextNode.nextSibling;
                    break;
                }
                // Try going up again. If parentNode is null that means we have
                // reached the top, and we will break out of both loops.
                nextNode = nextNode.parentNode;
            }
        }
        node = nextNode;
    }
    return Blockly.Xml.domToText(xmlBlock);
};
