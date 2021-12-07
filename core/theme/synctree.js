import * as Blockly from "blockly/core";

const themeSynctree = {};

themeSynctree.defaultBlockStyles = {
    colour_blocks: {
        colourPrimary: "#CF63CF",
        colourSecondary: "#C94FC9",
        colourTertiary: "#BD42BD",
    },
    list_blocks: {
        colourPrimary: "#9966FF",
        colourSecondary: "#855CD6",
        colourTertiary: "#774DCB",
    },
    logic_blocks: {
        colourPrimary: "#4C97FF",
        colourSecondary: "#4280D7",
        colourTertiary: "#3373CC",
    },
    loop_blocks: {
        colourPrimary: "#0fBD8C",
        colourSecondary: "#0DA57A",
        colourTertiary: "#0B8E69",
    },
    math_blocks: {
        colourPrimary: "#59C059",
        colourSecondary: "#46B946",
        colourTertiary: "#389438",
    },
    procedure_blocks: {
        colourPrimary: "#FF6680",
        colourSecondary: "#FF4D6A",
        colourTertiary: "#FF3355",
    },
    text_blocks: {
        colourPrimary: "#FFBF00",
        colourSecondary: "#E6AC00",
        colourTertiary: "#CC9900",
    },
    variable_blocks: {
        colourPrimary: "#FF8C1A",
        colourSecondary: "#FF8000",
        colourTertiary: "#DB6E00",
    },
    variable_dynamic_blocks: {
        colourPrimary: "#FF8C1A",
        colourSecondary: "#FF8000",
        colourTertiary: "#DB6E00",
    },
    hat_blocks: {
        colourPrimary: "#4C97FF",
        colourSecondary: "#4280D7",
        colourTertiary: "#3373CC",
        hat: "cap",
    },
    Variable: {
        colourPrimary: "#4488ff",
        colourSecondary: "#3366bb",
        colourTertiary: "#77aaff",
    },
    Primitive: {
        colourPrimary: "#88bb33",
        colourSecondary: "#668822",
        colourTertiary: "#aacc66",
    },
    ArrayList: {
        colourPrimary: "#00bb77",
        colourSecondary: "#008855",
        colourTertiary: "#44cc99",
    },
    HashMap: {
        colourPrimary: "#00bbee",
        colourSecondary: "#0088bb",
        colourTertiary: "#44ccff",
    },
    Operator: {
        colourPrimary: "#9966ff",
        colourSecondary: "#7744bb",
        colourTertiary: "#bb88ff",
    },
    Property: {
        colourPrimary: "#447744",
        colourSecondary: "#335533",
        colourTertiary: "#779977",
    },
    Protocol: {
        colourPrimary: "#227777",
        colourSecondary: "#115555",
        colourTertiary: "#559999",
    },
    logic: {
        colourPrimary: "#dd55dd",
        colourSecondary: "#aa44aa",
        colourTertiary: "#ee88ee",
    },
    Loop: {
        colourPrimary: "#ff6688",
        colourSecondary: "#bb4466",
        colourTertiary: "#ff88aa",
    },
    Exception: {
        colourPrimary: "#ff7733",
        colourSecondary: "#bb5522",
        colourTertiary: "#ff9966",
    },
    Util: {
        colourPrimary: "#ffbb00",
        colourSecondary: "#bb8800",
        colourTertiary: "#ffcc44",
    },
    Log: {
        colourPrimary: "#6666aa",
        colourSecondary: "#444477",
        colourTertiary: "#8888bb",
    },
    Authorization: {
        colourPrimary: "#995599",
        colourSecondary: "#774477",
        colourTertiary: "#bb77bb",
    },
    Bookmark: {
        colourPrimary: "#996666",
        colourSecondary: "#774444",
        colourTertiary: "#bb8888",
    },
    AccessControl: {
        colourPrimary: "#557799",
        colourSecondary: "#335577",
        colourTertiary: "#7799BB",
    },
    Storage: {
        colourPrimary: "#667744",
        colourSecondary: "#445522",
        colourTertiary: "#889966",
    },
    Dictionary: {
        colourPrimary: "#887755",
        colourSecondary: "#665533",
        colourTertiary: "#AA9977",
    },
    NextColor3: {
        colourPrimary: "#994466",
        colourSecondary: "#772244",
        colourTertiary: "#BB6688",
    },
    NextColor4: {
        colourPrimary: "#994400",
        colourSecondary: "#663300",
        colourTertiary: "#cc6600",
    },
    NextColor5: {
        colourPrimary: "#776600",
        colourSecondary: "#443300",
        colourTertiary: "#aa9900",
    },
    NextColor6: {
        colourPrimary: "#557700",
        colourSecondary: "#334400",
        colourTertiary: "#77aa00",
    },
    NextColor7: {
        colourPrimary: "#007755",
        colourSecondary: "#004433",
        colourTertiary: "#00aa77",
    },
    NextColor8: {
        colourPrimary: "#006699",
        colourSecondary: "#004466",
        colourTertiary: "#0088cc",
    },
    NextColor9: {
        colourPrimary: "#2244cc",
        colourSecondary: "#0022aa",
        colourTertiary: "#4466ee",
    },
    NextColor10: {
        colourPrimary: "#6600dd",
        colourSecondary: "#5500aa",
        colourTertiary: "#8822ff",
    },
    NextColor11: {
        colourPrimary: "#990099",
        colourSecondary: "#660066",
        colourTertiary: "#cc00cc",
    },
    NextColor12: {
        colourPrimary: "#990055",
        colourSecondary: "#660033",
        colourTertiary: "#cc0066",
    },
    NextColor13: {
        colourPrimary: "#880000",
        colourSecondary: "#550000",
        colourTertiary: "#bb0000",
    },
};

themeSynctree.categoryStyles = {
    colour_category: {
        colour: "#4488ff",
        colourSecondary: "#3366bb",
    },
    list_category: {
        colour: "#88bb33",
        colourSecondary: "#668822",
    },
    logic_category: {
        colour: "#4C97FF",
        colourSecondary: "#4280D7",
    },
    loop_category: {
        colour: "#00bb77",
        colourSecondary: "#008855",
    },
    math_category: {
        colour: "#00bbee",
        colourSecondary: "#0088bb",
    },
    procedure_category: {
        colour: "#9966ff",
        colourSecondary: "#7744bb",
    },
    text_category: {
        colour: "#447744",
        colourSecondary: "#335533",
    },
    variable_category: {
        colour: "#227777",
        colourSecondary: "#115555",
    },
    variable_dynamic_category: {
        colour: "#dd55dd",
        colourSecondary: "#aa44aa",
    },
    Variable: {
        colour: "#4488ff",
        colourSecondary: "#3366bb",
    },
    Primitive: {
        colour: "#88bb33",
        colourSecondary: "#668822",
    },
    ArrayList: {
        colour: "#00bb77",
        colourSecondary: "#008855",
    },
    HashMap: {
        colour: "#00bbee",
        colourSecondary: "#0088bb",
    },
    Operator: {
        colour: "#9966ff",
        colourSecondary: "#7744bb",
    },
    Property: {
        colour: "#447744",
        colourSecondary: "#335533",
    },
    Protocol: {
        colour: "#227777",
        colourSecondary: "#115555",
    },
    logic: {
        colour: "#dd55dd",
        colourSecondary: "#aa44aa",
    },
    Loop: {
        colour: "#ff6688",
        colourSecondary: "#bb4466",
    },
    Exception: {
        colour: "#ff7733",
        colourSecondary: "#bb5522",
    },
    Util: {
        colour: "#ffbb00",
        colourSecondary: "#bb8800",
    },
    Log: {
        colour: "#6666aa",
        colourSecondary: "#444477",
    },
    Authorization: {
        colour: "#995599",
        colourSecondary: "#774477",
    },
    Bookmark: {
        colour: "#996666",
        colourSecondary: "#774444",
    },
    AccessControl: {
        colour: "#557799",
        colourSecondary: "#335577",
    },
    Storage: {
        colour: "#667744",
        colourSecondary: "#445522",
    },
    Dictionary: {
        colour: "#887755",
        colourSecondary: "#665533",
    },
    NextColor3: {
        colour: "#994466",
        colourSecondary: "#772244",
    },
    NextColor4: {
        colour: "#994400",
        colourSecondary: "#663300",
    },
    NextColor5: {
        colour: "#776600",
        colourSecondary: "#443300",
    },
    NextColor6: {
        colour: "#557700",
        colourSecondary: "#334400",
    },
    NextColor7: {
        colour: "#007755",
        colourSecondary: "#004433",
    },
    NextColor8: {
        colour: "#006699",
        colourSecondary: "#004466",
    },
    NextColor9: {
        colour: "#2244cc",
        colourSecondary: "#0022aa",
    },
    NextColor10: {
        colour: "#6600dd",
        colourSecondary: "#5500aa",
    },
    NextColor11: {
        colour: "#990099",
        colourSecondary: "#660066",
    },
    NextColor12: {
        colour: "#990055",
        colourSecondary: "#660033",
    },
    NextColor13: {
        colour: "#880000",
        colourSecondary: "#550000",
    },
};

Blockly.Themes.Synctree = new Blockly.Theme(
    "synctree",
    themeSynctree.defaultBlockStyles,
    themeSynctree.categoryStyles,
    {
        workspaceBackgroundColour: "#292c33",
        toolboxBackgroundColour: "#292c33",
        toolboxForegroundColour:
            "rgba(255,255,255,0.7)" /* toolbox text color */,
        flyoutBackgroundColour: "#1c1f24",
        flyoutForegroundColour: "#ccc",
        flyoutOpacity: 0.9,
        // scrollbarColour: "#8a8f99",
        // scrollbarOpacity: 0.5,
        insertionMarkerColour: "#8a8f99",
        insertionMarkerOpacity: 0.5,
        markerColour: "#d0d0d0",
        cursorColour: "#d0d0d0",
    }
);

// Blockly.Themes.Synctree = Blockly.Theme.defineTheme("synctree", {
//     base: Blockly.Themes.Classic,
//     componentStyles: {
//         workspaceBackgroundColour: "#292c33",
//         toolboxBackgroundColour: "#292c33",
//         toolboxForegroundColour:
//             "rgba(255,255,255,0.7)" /* toolbox text color */,
//         flyoutBackgroundColour: "#1c1f24",
//         flyoutForegroundColour: "#ccc",
//         flyoutOpacity: 0.9,
//         // scrollbarColour: "#8a8f99",
//         // scrollbarOpacity: 0.5,
//         insertionMarkerColour: "#8a8f99",
//         insertionMarkerOpacity: 0.5,
//         markerColour: "#d0d0d0",
//         cursorColour: "#d0d0d0",
//     },
// });

/**
 * CSS for Toolbox.  See css.js for use.
 */
Blockly.Css.register([
    ".blocklyMainBackground {",
    "stroke-width: 0;",
    "stroke: rgba(0,0,0,0);" /* Equates to #ddd due to border being off-pixel. */,
    "}",
    ".blocklyToolboxDiv {",
    "border-right: solid 1px rgba(255,255,255,0.2);",
    "}",
    // ".blocklyFlyout {",
    // "border-right: solid 1px rgba(255,255,255,0.13);",
    // "}",
]);
