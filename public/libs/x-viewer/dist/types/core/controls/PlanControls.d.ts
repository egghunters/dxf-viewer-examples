import * as THREE from "three";
import { BaseControls, ControlsMode } from "./Control";
import type { CameraManager } from "../../core/camera";
/**
 * Controls for 2d viewers.
 */
export declare class PlanControls implements BaseControls {
    readonly mode = ControlsMode.Plan;
    private cameraManager;
    constructor(cameraManager: CameraManager);
    setupControl(): void;
    adjustCameraByBBox(box: THREE.Box3): void;
}
