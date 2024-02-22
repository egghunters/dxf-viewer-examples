import { SVGObject } from "three/examples/jsm/renderers/SVGRenderer.js";
/**
 * Default osnap icon size in pixel.
 */
export declare const OSnapIconSize = 10;
/**
 * OSnap marker type.
 */
export declare enum OSnapMarkerType {
    TripleCross = "TripleCross",
    Square = "Square",
    Triangle = "Triangle",
    CircleWithCross = "CircleWithCross",
    Cross = "Cross",
    Perpendicular = "Perpendicular"
}
/**
 * @internal
 */
export declare class SVGObjectUtils {
    static createSVGObject(node: SVGPathElement | SVGTextElement | SVGLineElement): SVGObject;
}
