/**
 * Controls mode.
 */
export declare enum ControlsMode {
    Orbit = 0,
    FirstPerson = 1,
    Plan = 2
}
/**
 * Base class for controls.
 */
export interface BaseControls {
    mode: ControlsMode;
    setupControl(): void;
    adjustCameraByBBox(bbox: THREE.Box3): void;
}
