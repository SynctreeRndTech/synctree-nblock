import * as Blockly from "blockly/core";
/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions for injecting Blockly into a web page.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Inject a Blockly editor into the specified container element (usually a div).
 * @param {Element|string} container Containing element, or its ID,
 *     or a CSS selector.
 * @param {Blockly.BlocklyOptions=} opt_options Optional dictionary of options.
 * @return {!Blockly.WorkspaceSvg} Newly created main workspace.
 */
Blockly.inject = function (container, opt_options) {
    Blockly.checkBlockColourConstants();

    if (typeof container == "string") {
        container =
            document.getElementById(container) ||
            document.querySelector(container);
    }
    // Verify that the container is in document.
    if (!container || !Blockly.utils.dom.containsNode(document, container)) {
        throw Error("Error: container is not in current document.");
    }
    var options = new Blockly.Options(
        opt_options || /** @type {!Blockly.BlocklyOptions} */ ({})
    );
    var subContainer = document.createElement("div");
    subContainer.className = "injectionDiv";
    subContainer.tabIndex = 0;
    Blockly.utils.aria.setState(
        subContainer,
        Blockly.utils.aria.State.LABEL,
        Blockly.Msg["WORKSPACE_ARIA_LABEL"]
    );

    container.appendChild(subContainer);
    var svg = Blockly.createDom_(subContainer, options);

    // Create surfaces for dragging things. These are optimizations
    // so that the browser does not repaint during the drag.
    var blockDragSurface = new Blockly.BlockDragSurfaceSvg(subContainer);

    var workspaceDragSurface = new Blockly.WorkspaceDragSurfaceSvg(
        subContainer
    );

    var workspace = Blockly.createMainWorkspace_(
        svg,
        options,
        blockDragSurface,
        workspaceDragSurface
    );

    Blockly.init_(workspace);

    // Keep focus on the first workspace so entering keyboard navigation looks correct.
    Blockly.mainWorkspace = workspace;

    Blockly.svgResize(workspace);

    subContainer.addEventListener("focusin", function () {
        // alert(123);
        Blockly.mainWorkspace = workspace;
    });

    return workspace;
};

/**
 * Bind document events, but only once.  Destroying and reinjecting Blockly
 * should not bind again.
 * Bind events for scrolling the workspace.
 * Most of these events should be bound to the SVG's surface.
 * However, 'mouseup' has to be on the whole document so that a block dragged
 * out of bounds and released will know that it has been released.
 * Also, 'keydown' has to be on the whole document since the browser doesn't
 * understand a concept of focus on the SVG image.
 * @private
 */

function test(e) {
    console.log(e);
    alert(213);
}
Blockly.inject.bindDocumentEvents_ = function () {
    if (!Blockly.documentEventsBound_) {
        // test(null);
        Blockly.browserEvents.conditionalBind(
            document,
            "scroll",
            null,
            function () {
                var workspaces = Blockly.Workspace.getAll();
                for (var i = 0, workspace; (workspace = workspaces[i]); i++) {
                    if (workspace.updateInverseScreenCTM) {
                        workspace.updateInverseScreenCTM();
                    }
                }
            }
        );
        Blockly.browserEvents.conditionalBind(
            document,
            "keydown",
            null,
            Blockly.onKeyDown
        );
        // longStop needs to run to stop the context menu from showing up.  It
        // should run regardless of what other touch event handlers have run.
        Blockly.browserEvents.bind(
            document,
            "touchend",
            null,
            Blockly.longStop_
        );
        Blockly.browserEvents.bind(
            document,
            "touchcancel",
            null,
            Blockly.longStop_
        );

        // Blockly.browserEvents.bind(document, "copy", null, test);

        // Some iPad versions don't fire resize after portrait to landscape change.
        if (Blockly.utils.userAgent.IPAD) {
            Blockly.browserEvents.conditionalBind(
                window,
                "orientationchange",
                document,
                function () {
                    // TODO (#397): Fix for multiple Blockly workspaces.
                    Blockly.svgResize(
                        /** @type {!Blockly.WorkspaceSvg} */
                        (Blockly.getMainWorkspace())
                    );
                }
            );
        }
    }
    Blockly.documentEventsBound_ = true;
};

/**
 * Load sounds for the given workspace.
 * @param {string} pathToMedia The path to the media directory.
 * @param {!Blockly.Workspace} workspace The workspace to load sounds for.
 * @private
 */
Blockly.inject.loadSounds_ = function (pathToMedia, workspace) {
    var audioMgr = workspace.getAudioManager();
    audioMgr.load(
        [
            pathToMedia + "click.mp3",
            pathToMedia + "click.wav",
            pathToMedia + "click.ogg",
        ],
        "click"
    );
    audioMgr.load(
        [
            pathToMedia + "disconnect.wav",
            pathToMedia + "disconnect.mp3",
            pathToMedia + "disconnect.ogg",
        ],
        "disconnect"
    );
    audioMgr.load(
        [
            pathToMedia + "delete.mp3",
            pathToMedia + "delete.ogg",
            pathToMedia + "delete.wav",
        ],
        "delete"
    );

    // Bind temporary hooks that preload the sounds.
    var soundBinds = [];
    var unbindSounds = function () {
        while (soundBinds.length) {
            Blockly.browserEvents.unbind(soundBinds.pop());
        }
        audioMgr.preload();
    };

    // These are bound on mouse/touch events with Blockly.bindEventWithChecks_, so
    // they restrict the touch identifier that will be recognized.  But this is
    // really something that happens on a click, not a drag, so that's not
    // necessary.

    // Android ignores any sound not loaded as a result of a user action.
    soundBinds.push(
        Blockly.browserEvents.conditionalBind(
            document,
            "mousemove",
            null,
            unbindSounds,
            true
        )
    );
    soundBinds.push(
        Blockly.browserEvents.conditionalBind(
            document,
            "touchstart",
            null,
            unbindSounds,
            true
        )
    );
};
