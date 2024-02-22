import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { ProgressBar, Spinner } from "../components";
import { ViewerName } from "./Constants";
import { Plugin } from "./Plugin";
import { ViewerEvent } from "./ViewerEvent";
import { BaseViewerConfig, CameraConfig, CameraProjection, ModelConfig, Viewpoint } from "../../core/Configs";
import { CameraManager } from "../../core/camera";
import { CanvasRender } from "../../core/canvas";
import { Container } from "../../core/components/Container";
import { FontManager } from "../../core/font";
import { ZoomToRectHelper } from "../../core/helpers";
import { LoadingHelper } from "../../core/helpers/LoadingHelper";
import { InputManager } from "../../core/input-manager";
import { Model } from "../../core/model";
import { PickManager } from "../../core/pick";
import { SceneManager } from "../../core/scene/SceneManager";
import { UndoManager } from "../../core/undo";
import { Event } from "../../core/utils";
type ViewerEvents = {
    [K in ViewerEvent]: any;
};
export declare abstract class BaseViewer extends Event<ViewerEvents> {
    name: ViewerName;
    protected viewerCfg: BaseViewerConfig;
    private clock;
    protected targetMaxFps: number;
    protected timeStamp: number;
    private renderEnabled;
    /**
     * @internal
     */
    protected requestAnimationFrameHandle?: number;
    container: Container;
    protected plugins: Plugin[];
    loadedModels: Model[];
    private raf?;
    private timeoutSymbol?;
    protected homeView?: Viewpoint;
    protected inputManager: InputManager;
    protected cameraManager: CameraManager;
    protected sceneManager: SceneManager;
    protected fontManager?: FontManager;
    protected pickManager: PickManager;
    protected undoManager: UndoManager;
    protected overlayRender: CanvasRender;
    protected css2dRenderer: CSS2DRenderer;
    protected spinner: Spinner;
    protected progressBar?: ProgressBar;
    protected loaderHelper: LoadingHelper;
    protected zoomToRectHelper?: ZoomToRectHelper;
    /**
     * Enables selecting an object
     */
    protected _enableSelection: boolean;
    constructor(viewerCfg: BaseViewerConfig);
    private initLogLevel;
    private initLocalization;
    get viewerContainer(): HTMLElement;
    get widgetContainer(): HTMLElement;
    getUndoManager(): UndoManager;
    getInputManager(): InputManager;
    getCameraManager(): CameraManager;
    getOverlayRender(): CanvasRender;
    /**
     * The WebGLRenderer.
     */
    get renderer(): THREE.WebGLRenderer;
    /**
     * Current camera.
     */
    get camera(): THREE.PerspectiveCamera | THREE.OrthographicCamera;
    /**
     * Current Scene.
     */
    get scene(): THREE.Scene;
    /**
     * Gets if selection is enabled.
     */
    abstract get enableSelection(): boolean;
    /**
     * Sets if selection is enabled.
     * A derived class may need to clean up selected object if any.
     */
    abstract set enableSelection(enable: boolean);
    getRaycaster(): THREE.Raycaster;
    getViewerConfig(): BaseViewerConfig;
    getSpinner(): Spinner;
    getFontManager(): FontManager | undefined;
    private initCSS2DRenderer;
    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - Anything added to, removed from scene, or objects' position, scale, rotation, opacity, material, etc. changed
     *  - Anything selected/unselected
     *  - Camera changed
     *  - Render area resized
     * @internal
     */
    enableRender: (time?: number) => void;
    protected animate(): void;
    resize(): void;
    /**
     * Sets decoder path for draco loader.
     * Draco decoder will be used if a model is draco encoded.
     * @param decoderPath e.g., "libs/draco/gltf/"
     * @internal
     */
    setDracoDecoderPath(path: string): void;
    abstract loadModel(modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    addModel(model: Model): void;
    setFont(urls: string[]): Promise<void>;
    /**
     *
     * @description 2d ignore position z.
     */
    is3d(): boolean;
    /**
     * Gets how long a pixel represents in world coordinate.
     * This works fine for OrthographicCamera.
     * As for PerspectiveCamera, a pixel represents different size for different position,
     * depends on how far the camera is and its fov, etc. We'll simply take the camera target as the position to calculate.
     * @internal
     */
    getPixelSizeInWorldCoord(): number;
    /**
     * @description {en} Asks user to select a box area, and zooms to it.
     * @description {zh} 询问用户选择一个框选区域，然后缩放到该区域。
     * @example
     * ``` typescript
     * viewer.zoomToRect();
     * ```
     */
    zoomToRect(): void;
    /**
     * @internal
     */
    deactivateZoomRect(): void;
    /**
     * Gets an unique modelId in case the expected id is duplicated.
     */
    protected getUniqueModelId(expectedModelId: string): string;
    /**
     * Gets all objects' bounding box.
     */
    getBBox(): THREE.Box3;
    /**
     * Flies to given object and keep current view direction unchanged.
     */
    flyToObject(object: THREE.Object3D): void;
    flyToObjects(objects: THREE.Object3D[]): void;
    /**
     * Make camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     */
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3): void;
    /**
     * Views objects by given direction.
     */
    flyToDirection(direction: THREE.Vector3): void;
    /**
     * Goes to home view.
     */
    goToHomeView(): void;
    /**
     * Fits the camera to view all objects in scene, keeps current view
     * direction unchanged.
     */
    viewFitAll(): void;
    /**
     * Zooms to given bounding box.
     */
    zoomToBBox(bbox: THREE.Box3): void;
    /**
     * Picks the closest object by mouse position.
     */
    pickObject(mousePosition: THREE.Vector2, layerChannels?: number[]): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>> | undefined;
    /**
     * Picks objects by mouse position.
     */
    pickObjects(mousePosition: THREE.Vector2, layerChannels?: number[]): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    getRaycastableObjects(): THREE.Object3D<THREE.Object3DEventMap>[];
    /**
     * @description {en} Sets background color.
     * @param r Red channel value between 0 and 1.
     * @param g Green channel value between 0 and 1.
     * @param b Blue channel value between 0 and 1.
     * @example
     * ``` typescript
     * // Sets background to gray
     * viewer.setBackgroundColor(0.5, 0.5, 0.5);
     * ```
     */
    setBackgroundColor(r: number, g: number, b: number): void;
    /**
     * Sets global clip planes.
     * This is mainly used by 3d viewers.
     */
    setGlobalClipPlanes(planes: THREE.Plane[]): void;
    getCameraProjection(): CameraProjection;
    setCameraProjection(proj: CameraProjection): void;
    enableControl(enable: boolean): void;
    enableRotate(enable: boolean): void;
    enableZoom(enable: boolean): void;
    enablePan(enable: boolean): void;
    getHomeView(): Viewpoint | undefined;
    setHomeView(viewpoint: Viewpoint): void;
    getCameraConfig(): CameraConfig;
    setCameraConfig(cameraCfg: CameraConfig): void;
    getCameraDirection(): THREE.Vector3;
    getRenderInfo(): {
        drawCalls: number;
        lines: number;
        points: number;
        triangles: number;
        geometries: number;
        textures: number;
        materials: number;
    };
    /**
     *
     */
    destroy(): void;
    /**
     * Installs a Plugin.
     */
    addPlugin(plugin: Plugin): void;
    /**
     * Uninstalls a Plugin, clearing content from it first.
     */
    removePlugin(plugin: Plugin): void;
    /**
     * Clears all plugins.
     * A plugin is not created by viewer, thus, won't be destroyed by viewer.
     */
    clearPlugins(): void;
    /**
     * Finds a Plugin.
     */
    findPlugin(id: string): Plugin | undefined;
}
export {};
