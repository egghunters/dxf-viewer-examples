import * as THREE from "three";
import { CameraConfig, CameraProjection, Viewpoint } from "../../core/Configs";
import CameraControls from "../../core/camera-controls";
import { ControlsMode } from "../../core/controls/Control";
import { type BaseViewer } from "../../core/viewers/BaseViewer";
export declare class CameraManager {
    private viewer;
    readonly perspectiveCamera: THREE.PerspectiveCamera;
    readonly orthographicCamera: THREE.OrthographicCamera;
    activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    readonly cameraControls: CameraControls;
    private previousDistance;
    private previousAzimuthRotateSpeed;
    private previousPolarRotateSpeed;
    private previousDollySpeed;
    private previousTruckSpeed;
    private previousMouseLeft;
    protected enableKeyDown: boolean;
    /**
     * A map/list of different controls
     */
    private controlsMap;
    private activeControls;
    private projection;
    /**
     * For OrbitControls, a user would like to rotate around where mouse is clicked,
     * rather than the screen center.
     * We'll display an anchor at where mouse is clicked.
     */
    protected anchor: HTMLElement;
    constructor(viewer: BaseViewer);
    get viewerContainer(): HTMLElement;
    get inputManager(): import("../../core/input-manager/InputManager").InputManager;
    private createAnchor;
    protected setAnchorPosition(x: number, y: number): void;
    setOrbitPointVisible(visible: boolean): void;
    isOrbitPointVisible(): boolean;
    private setOrthoCameraAspect;
    private setupCameras;
    private setCameraPositionAndTarget;
    private setupControls;
    private onKeyDown;
    private onChange;
    setOrthoCamera(): void;
    private getDims;
    private setupOrthoCamera;
    private setPerspectiveCamera;
    update(delta: number): boolean;
    updateAspect(): void;
    get camera(): THREE.PerspectiveCamera | THREE.OrthographicCamera;
    enableKeyControl(enable: boolean): void;
    getTarget(): THREE.Vector3;
    getPosition(): THREE.Vector3;
    adjustCameraByBBox(bbox: THREE.Box3): void;
    enableControl(active: boolean): void;
    get enableRotate(): boolean;
    set enableRotate(enable: boolean);
    enableZoom(enable: boolean): void;
    enablePan(enable: boolean): void;
    enableMouseLeft(enable: boolean): void;
    setCameraPosition(position: THREE.Vector3): void;
    setCameraTarget(target: THREE.Vector3): void;
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3): void;
    flyToPosition(x: number, y: number, z: number): void;
    flyToBox(box: THREE.Box3): void;
    fitToSphere(box: THREE.Object3D | THREE.Sphere): void;
    flyToObject(object: THREE.Object3D): void;
    flyToViewpoint(viewpoint: Viewpoint): void;
    getDistanceToFitSphere(radius: number): number;
    setNavigationMode(mode: ControlsMode): void;
    getProjection(): CameraProjection;
    setProjection(proj: CameraProjection): void;
    setOrbitPoint(point: THREE.Vector3): void;
    getCameraDirection(): THREE.Vector3;
    getCameraConfig(): CameraConfig;
    getCurrentViewpoint(): Viewpoint;
    setCameraConfig(cameraCfg: CameraConfig): void;
    destroy(): void;
}
