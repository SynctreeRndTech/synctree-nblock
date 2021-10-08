import * as Blockly from "blockly/core";

Blockly.synctree.Renderer = function (name) {
    Blockly.synctree.Renderer.superClass_.constructor.call(this, name);
};
Blockly.utils.object.inherits(
    Blockly.synctree.Renderer,
    Blockly.blockRendering.Renderer
);
/**
 * Create a new instance of the renderer's constant provider.
 * @return {!Blockly.minimalist.ConstantProvider} The constant provider.
 * @protected
 * @override
 */
Blockly.synctree.Renderer.prototype.makeConstants_ = function () {
    return new Blockly.synctree.ConstantProvider();
};
/**
 * Create a new instance of the renderer's render info object.
 * @param {!Blockly.BlockSvg} block The block to measure.
 * @return {!Blockly.synctree.RenderInfo} The render info object.
 * @protected
 * @override
 */
Blockly.synctree.Renderer.prototype.makeRenderInfo_ = function (block) {
    return new Blockly.synctree.RenderInfo(this, block);
};

/**
 * Create a new instance of the renderer's drawer.
 * @param {!Blockly.BlockSvg} block The block to render.
 * @param {!Blockly.blockRendering.RenderInfo} info An object containing all
 *   information needed to render this block.
 * @return {!Blockly.synctree.Drawer} The drawer.
 * @protected
 * @override
 */
Blockly.synctree.Renderer.prototype.makeDrawer_ = function (block, info) {
    return new Blockly.synctree.Drawer(
        block,
        /** @type {!Blockly.synctree.RenderInfo} */ info
    );
};

/**
 * Create a new instance of a renderer path object.
 * @param {!SVGElement} root The root SVG element.
 * @param {!Blockly.Theme.BlockStyle} style The style object to use for
 *     colouring.
 * @return {!Blockly.synctree.PathObject} The renderer path object.
 * @package
 * @override
 */
Blockly.synctree.Renderer.prototype.makePathObject = function (root, style) {
    return new Blockly.synctree.PathObject(
        root,
        style,
        /** @type {!Blockly.synctree.ConstantProvider} */ this.getConstants()
    );
};

Blockly.blockRendering.register("synctree", Blockly.synctree.Renderer);
