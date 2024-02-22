import * as THREE from "three";
import { BaseControls, ControlsMode } from "./Control";
import type { CameraManager } from "../../core/camera/CameraManager";
/**
 * Controls for 3d viewers.
 */
export declare class OrbitControls implements BaseControls {
    readonly mode = ControlsMode.Orbit;
    private cameraManager;
    constructor(cameraManager: CameraManager);
    setupControl(): void;
    adjustCameraByBBox(box: THREE.Box3): void;
}
