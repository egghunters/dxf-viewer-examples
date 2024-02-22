import * as THREE from "three";
/**
 * @internal
 */
export declare enum Views {
    Top = "Top",
    Bottom = "Bottom",
    Front = "Front",
    Back = "Back",
    Left = "Left",
    Right = "Right"
}
/**
 * Util methods about Viewer3d
 * @internal
 */
export declare class Viewer3dUtils {
    /**
     * Gets camera's new position and target(lookAt) by given bbox and view
     */
    /**
     * Gets camera's new position and target(lookAt) by given bbox and expected camera direction
     */
    static getCameraDirectionByView(view: Views | string): THREE.Vector3;
}
