import * as Blockly from "blockly/core";

import ko from "blockly/msg/ko";
import en from "blockly/msg/en";
import ja from "blockly/msg/en";
import fr from "blockly/msg/fr";
import de from "blockly/msg/de";
import es from "blockly/msg/es";
import zhHans from "blockly/msg/zh-hans";
import zhHant from "blockly/msg/zh-hant";

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

Blockly.synctreeUtil.setLanguage = (code) => {
    let lang = null;
    switch (code) {
        case "en":
        default:
            lang = en;
            break;
        case "ko":
            lang = ko;
            break;
        case "ja":
            lang = ja;
            break;
        case "fr":
            lang = fr;
            break;
        case "de":
            lang = de;
            break;
        case "es":
            lang = es;
            break;
        case "zh-hans":
            lang = zhHans;
            break;
        case "zh-hant":
            lang = zhHant;
            break;
    }
    Blockly.setLocale(lang);
};
