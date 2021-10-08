import * as Blockly from "blockly/core";

Blockly.synctree.PathObject = function (root, style, constants) {
    Blockly.synctree.PathObject.superClass_.constructor.call(
        this,
        root,
        style,
        constants
    );

    /**
     * The renderer's constant provider.
     * @type {!Blockly.synctree.ConstantProvider}
     */
    this.constants = constants;

    /**
     * The selected path of the block.
     * @type {SVGElement}
     * @private
     */
    this.svgPathSelected_ = null;

    /**
     * The outline paths on the block.
     * @type {!Object.<string,!SVGElement>}
     * @private
     */
    this.outlines_ = {};

    /**
     * A set used to determine which outlines were used during a draw pass.  The
     * set is initialized with a reference to all the outlines in
     * `this.outlines_`. Every time we use an outline during the draw pass, the
     * reference is removed from this set.
     * @type {Object.<string, number>}
     * @private
     */
    this.remainingOutlines_ = null;

    /**
     * The type of block's output connection shape.  This is set when a block with
     * an output connection is drawn.
     * @package
     */
    this.outputShapeType = null;
};
Blockly.utils.object.inherits(
    Blockly.synctree.PathObject,
    Blockly.blockRendering.PathObject
);

/**
 * @override
 */
Blockly.synctree.PathObject.prototype.setPath = function (pathString) {
    Blockly.synctree.PathObject.superClass_.setPath.call(this, pathString);
    if (this.svgPathSelected_) {
        this.svgPathSelected_.setAttribute("d", pathString);
    }
};

/**
 * @override
 */
Blockly.synctree.PathObject.prototype.applyColour = function (block) {
    Blockly.synctree.PathObject.superClass_.applyColour.call(this, block);
    // Set shadow stroke colour.
    if (block.isShadow() && block.getParent()) {
        this.svgPath.setAttribute(
            "stroke",
            block.getParent().style.colourTertiary
        );
    }

    // Apply colour to outlines.
    for (
        var i = 0, keys = Object.keys(this.outlines_), key;
        (key = keys[i]);
        i++
    ) {
        this.outlines_[key].setAttribute("fill", this.style.colourTertiary);
    }
};

/**
 * @override
 */
Blockly.synctree.PathObject.prototype.flipRTL = function () {
    Blockly.synctree.PathObject.superClass_.flipRTL.call(this);
    // Mirror each input outline path.
    for (
        var i = 0, keys = Object.keys(this.outlines_), key;
        (key = keys[i]);
        i++
    ) {
        this.outlines_[key].setAttribute("transform", "scale(-1 1)");
    }
};

/**
 * @override
 */
Blockly.synctree.PathObject.prototype.updateSelected = function (enable) {
    this.setClass_("blocklySelected", enable);
    if (enable) {
        if (!this.svgPathSelected_) {
            this.svgPathSelected_ =
                /** @type {!SVGElement} */ this.svgPath.cloneNode(true);
            this.svgPathSelected_.setAttribute("fill", "none");
            this.svgPathSelected_.setAttribute(
                "filter",
                "url(#" + this.constants.selectedGlowFilterId + ")"
            );
            this.svgRoot.appendChild(this.svgPathSelected_);
        }
    } else {
        if (this.svgPathSelected_) {
            this.svgRoot.removeChild(this.svgPathSelected_);
            this.svgPathSelected_ = null;
        }
    }
};

/**
 * @override
 */
Blockly.synctree.PathObject.prototype.updateReplacementFade = function (
    enable
) {
    this.setClass_("blocklyReplaceable", enable);
    if (enable) {
        this.svgPath.setAttribute(
            "filter",
            "url(#" + this.constants.replacementGlowFilterId + ")"
        );
    } else {
        this.svgPath.removeAttribute("filter");
    }
};

/**
 * @override
 */
Blockly.synctree.PathObject.prototype.updateShapeForInputHighlight = function (
    conn,
    enable
) {
    var name = conn.getParentInput().name;
    var outlinePath = this.getOutlinePath_(name);
    if (!outlinePath) {
        return;
    }
    if (enable) {
        outlinePath.setAttribute(
            "filter",
            "url(#" + this.constants.replacementGlowFilterId + ")"
        );
    } else {
        outlinePath.removeAttribute("filter");
    }
};

/**
 * Method that's called when the drawer is about to draw the block.
 * @package
 */
Blockly.synctree.PathObject.prototype.beginDrawing = function () {
    this.remainingOutlines_ = {};
    for (
        var i = 0, keys = Object.keys(this.outlines_), key;
        (key = keys[i]);
        i++
    ) {
        // The value set here isn't used anywhere, we are just using the
        // object as a Set data structure.
        this.remainingOutlines_[key] = 1;
    }
};

/**
 * Method that's called when the drawer is done drawing.
 * @package
 */
Blockly.synctree.PathObject.prototype.endDrawing = function () {
    // Go through all remaining outlines that were not used this draw pass, and
    // remove them.
    if (this.remainingOutlines_) {
        for (
            var i = 0, keys = Object.keys(this.remainingOutlines_), key;
            (key = keys[i]);
            i++
        ) {
            this.removeOutlinePath_(key);
        }
    }
    this.remainingOutlines_ = null;
};

/**
 * Set the path generated by the renderer for an outline path on the respective
 * outline path SVG element.
 * @param {string} name The input name.
 * @param {string} pathString The path.
 * @package
 */
Blockly.synctree.PathObject.prototype.setOutlinePath = function (
    name,
    pathString
) {
    var outline = this.getOutlinePath_(name);
    outline.setAttribute("d", pathString);
    outline.setAttribute("fill", this.style.colourTertiary);
};

/**
 * Create's an outline path for the specified input.
 * @param {string} name The input name.
 * @return {!SVGElement} The SVG outline path.
 * @private
 */
Blockly.synctree.PathObject.prototype.getOutlinePath_ = function (name) {
    if (!this.outlines_[name]) {
        this.outlines_[name] = Blockly.utils.dom.createSvgElement(
            "path",
            {
                class: "blocklyOutlinePath",
                // IE doesn't like paths without the data definition, set empty default
                d: "",
            },
            this.svgRoot
        );
    }
    if (this.remainingOutlines_) {
        delete this.remainingOutlines_[name];
    }
    return this.outlines_[name];
};

/**
 * Remove an outline path that is associated with the specified input.
 * @param {string} name The input name.
 * @private
 */
Blockly.synctree.PathObject.prototype.removeOutlinePath_ = function (name) {
    this.outlines_[name].parentNode.removeChild(this.outlines_[name]);
    delete this.outlines_[name];
};
