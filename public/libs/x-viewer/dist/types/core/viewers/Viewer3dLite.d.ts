import * as THREE from "three";
import { IsolateObjectsParam, ModelConfig } from "../../core/Configs";
import { CameraControlsEx } from "../../core/controls/CameraControlsEx";
import { ModelData3d } from "../../core/model";
/**
 * @internal
 */
export declare enum ViewerMode {
    Browser = 0,
    Browserless = 1,
    Headless = 2
}
/**
 * @internal
 */
export declare class Viewer3dLite {
    containerOrCanvas: HTMLDivElement | any;
    glContext?: WebGLRenderingContext | WebGL2RenderingContext;
    camera?: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    renderTarget?: THREE.WebGLRenderTarget;
    controls?: CameraControlsEx;
    selectedObject: any | undefined;
    loadedModels: ModelData3d[];
    pmremGenerator?: THREE.PMREMGenerator;
    private clock;
    private viewerMode;
    private raycaster?;
    private savedMaterialsForOpacity?;
    private jobCount;
    private bbox;
    private outlineMaterial;
    private outlineRoot;
    private transparentObjectIds;
    private requestAnimationFrameHandle?;
    constructor(containerOrCanvas: HTMLDivElement | any, viewerMode?: ViewerMode, glContext?: WebGLRenderingContext | WebGL2RenderingContext);
    /**
     * Initialize everything it needs
     */
    init(): void;
    private initScene;
    private isBrowserlessMode;
    private isBrowserMode;
    private initRenderer;
    private initCamera;
    private initControls;
    private initLights;
    /**
     * Initialize mouse/pointer events
     */
    private initPointerEvents;
    animate(): void;
    destroy(): void;
    loadLocalModel(url: string, modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * We don't plan to support onProgress really well in this class.
     */
    loadModel(modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    parseGltf(data: ArrayBuffer | string, modelCfg: ModelConfig, onSuccess: (object: THREE.Object3D) => void, onError?: (event: ErrorEvent) => void): void;
    /**
     * Applies options and add object to scene.
     */
    applyOptionsAndAddToScene: (url: string, object: THREE.Object3D, modelCfg: ModelConfig, onProgress?: ((event: ProgressEvent) => void) | undefined) => Promise<void>;
    /**
     *
     * @param model
     * @returns
     * @description Add model data to viewer.
     */
    addModel(model: ModelData3d): void;
    /**
     * We won't set a opacity or highlight directly, because that way will lose model's original opacity or color value
     * @param isAdd is add or remove the opacity we added
     * @param opacity
     */
    addOrRemoveObjectOpacity(isAdd?: boolean, opacity?: number, includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    hasTransparentObject(): boolean;
    /**
     * Gets intersections by given mouse location.
     * If no MouseEvent is passed in, use (0, 0) as the raycaster's origin.
     */
    private getIntersections;
    /**
     * Handles mouse click event
     */
    private handleMouseClick;
    selectObject(object?: THREE.Object3D): void;
    /**
     * Clears the current selection
     */
    clearSelection(): void;
    /**
     * Make camera fly to objects
     */
    flyToObjects(objects: THREE.Object3D[]): void;
    /**
     * Make camera fly to an object
     */
    flyToObject(object: THREE.Object3D): void;
    /**
     * Flies to current selected object if any
     */
    flyToSelectedObject(): void;
    /**
     * Make camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     */
    flyTo(position: THREE.Vector3 | number[], lookAt: THREE.Vector3 | number[], onCompleteCallback?: () => void): void;
    goToHomeView(): void;
    /**
     * Sets environment for the scene.
     * @param data Uint16Array of the hdr content
     */
    setEnvironmentFromDataArray(data?: Uint16Array): void;
    /**
     * Tries to adjust camera near/far clip plane according to objects size in scene.
     * Do this to avoid the case when objects are too small or big thus clipped!
     */
    private tryAdjustCameraNearAndFar;
    isolateObjects(params: IsolateObjectsParam[]): void;
    private getMeshes;
    /**
     * Increases job count, and show spinner accordingly
     */
    increaseJobCount(): void;
    /**
     * Decreases job count, and hide spinner accordingly
     */
    decreaseJobCount(): void;
    /**
     * Compute bounding box of loaded models
     */
    computeBoundingBox(): THREE.Box3;
    getContext(): WebGLRenderingContext | WebGL2RenderingContext | undefined;
    getCameraDirection(): {
        x: number;
        y: number;
        z: number;
    };
    setFov(fov: number): void;
}
