import * as Blockly from "blockly/core";

/**
 * Handle a key-down on SVG drawing surface. Does nothing if the main workspace
 * is not visible.
 * @param {!KeyboardEvent} e Key down event.
 * @package
 */
// TODO (https://github.com/google/blockly/issues/1998) handle cases where there
// are multiple workspaces and non-main workspaces are able to accept input.
Blockly.onKeyDown = function (e) {
    var mainWorkspace = Blockly.mainWorkspace;
    if (!mainWorkspace) {
        return;
    }

    if (
        Blockly.utils.isTargetInput(e) ||
        (mainWorkspace.rendered && !mainWorkspace.isVisible())
    ) {
        // When focused on an HTML text input widget, don't trap any keys.
        // Ignore keypresses on rendered workspaces that have been explicitly
        // hidden.
        return;
    }
    Blockly.ShortcutRegistry.registry.onKeyDown(mainWorkspace, e);
};

/**
 * Handle a key-down on SVG drawing surface. Does nothing if the main workspace
 * is not visible.
 * @param {ClipboardEvent} e ClipboardEvent.
 * @package
 */
// Blockly.Workspace.addEventListener("copy", (e) => {
//     if (e.target !== document.body) {
//         return;
//     }
//     console.log("addEventListener", e);

//     // BlockUtil.copyBlock(e);
// });
