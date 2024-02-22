/**
 * Constants used by dxf
 */
export declare const ByLayer = "BYLAYER";
export declare const ByBlock = "BYBLOCK";
/**
 * The render order for entities.
 * AutoCAD has well defined render order for each entity. But we have trouble
 * to make the order the same as in AutoCAD. If we cannot, we'll simply make
 * entities follow this order.
 */
export declare enum DxfRenderOrder {
    Mesh = -1,
    MeshWithPattern = 0,
    LineWithWidth = 1,
    Line = 2,
    LineWithPattern = 3,
    Point = 4,
    Text = 5
}
/**
 * For nested types, we need to compare their inner entities.
 */
export declare const NestedCompareTypes: string[];
