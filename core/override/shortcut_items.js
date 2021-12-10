import * as Blockly from "blockly/core";

document.addEventListener("copy", (e) => {
    if (e.target !== document.body) {
        return;
    }
    const workspace = Blockly.getMainWorkspace();
    if (
        !workspace.options.readOnly &&
        !Blockly.Gesture.inProgress() &&
        Blockly.selected &&
        Blockly.selected.isDeletable() &&
        Blockly.selected.isMovable()
    ) {
        Blockly.hideChaff();
        Blockly.copy(e, Blockly.selected);
    }
});

document.addEventListener("cut", (e) => {
    if (e.target !== document.body) {
        return;
    }
    const workspace = Blockly.getMainWorkspace();
    if (
        !workspace.options.readOnly &&
        !Blockly.Gesture.inProgress() &&
        Blockly.selected &&
        Blockly.selected.isDeletable() &&
        Blockly.selected.isMovable() &&
        !Blockly.selected.workspace.isFlyout
    ) {
        Blockly.hideChaff();
        Blockly.copy(e, Blockly.selected);
        Blockly.deleteBlock(
            /** @type {!Blockly.BlockSvg} */ (Blockly.selected)
        );
    }
});

document.addEventListener("paste", (e) => {
    if (e.target !== document.body) {
        return;
    }
    const workspace = Blockly.getMainWorkspace();
    if (!workspace.options.readOnly && !Blockly.Gesture.inProgress()) {
        Blockly.paste(workspace, e);
    }
});

Blockly.ShortcutRegistry.registry.unregister(Blockly.ShortcutItems.names.COPY);
Blockly.ShortcutRegistry.registry.removeAllKeyMappings(
    Blockly.ShortcutItems.names.COPY
);
Blockly.ShortcutRegistry.registry.unregister(Blockly.ShortcutItems.names.CUT);
Blockly.ShortcutRegistry.registry.removeAllKeyMappings(
    Blockly.ShortcutItems.names.CUT
);

Blockly.ShortcutRegistry.registry.unregister(Blockly.ShortcutItems.names.PASTE);
Blockly.ShortcutRegistry.registry.removeAllKeyMappings(
    Blockly.ShortcutItems.names.PASTE
);
