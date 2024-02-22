import * as THREE from "three";
import { BaseViewer } from "./BaseViewer";
import { ViewerName } from "./Constants";
import { Viewer3dConfig, ModelConfig, Viewpoint } from "../../core/Configs";
import { EffectManager } from "../../core/effect";
import { EventInfo } from "../../core/input-manager/InputManager";
import { BimTilesModel, TileObject } from "../../core/model";
/**
 * BimTilesViewer
 */
export declare class BimTilesViewer extends BaseViewer {
    name: ViewerName;
    protected pickUsageScene: THREE.Scene;
    protected effect: EffectManager;
    loadedModels: BimTilesModel[];
    selectedObject?: TileObject;
    /**
     * Enables the feature to hover on an object and blend it color a bit.
     */
    enableHoverEffect: boolean;
    constructor(viewerCfg: Viewer3dConfig, homeView?: Viewpoint);
    protected setupDefaultEvents(): void;
    protected setDefaultBackground(): void;
    private renderImmediately;
    protected handleAnchorPoint(intersect?: THREE.Intersection): void;
    protected handleClickObject(intersection: TileObject): void;
    is3d(): boolean;
    /**
     * Sets a model's opacity.
     */
    setModelOpacity(modelId: string, opacity: number): void;
    /**
     * Clears a model's opacity.
     */
    clearModelOpacity(modelId: string): void;
    /**
     * Sets all models' opacity.
     */
    setModelsOpacity(opacity: number): void;
    /**
     * Clears all models' opacity.
     */
    clearModelsOpacity(): void;
    setModelVisible(modelId: string, visible: boolean): void;
    setModelsVisible(visible: boolean): void;
    clearHighlight(): void;
    clearSelection(): void;
    /**
     * Gets if selection is enabled.
     */
    get enableSelection(): boolean;
    /**
     * Sets if selection is enabled.
     */
    set enableSelection(enable: boolean);
    flyToUserId(tilesetId: number, userId: number): void;
    getBoxByUserId(tilesetId: number, userId: number): THREE.Box3 | undefined;
    protected handleMouseMove(event: EventInfo): void;
    private update3dTiles;
    /**
     * BimTiles does not support external incoming matrix.
     * Don't support external incoming modelId.
     */
    loadModel(modelCfg: ModelConfig, onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined): Promise<void>;
    setObjectHighlightedByUserIds(modelId: number, userIds: number[], highlight: boolean): void;
    setObjectOpacityByUserIds(modelId: number, userIds: number[], opacity: number): void;
    setOtherObjectOpacityByUserIds(modelId: number, userIds: number[], opacity: number): void;
    setObjectVisibleByUserIds(modelId: number, userIds: number[], visible: boolean): void;
    setOtherObjectVisibleByUserIds(modelId: number, userIds: number[], visible: boolean): void;
    setObjectHoveredByUserId(modelId: number, userId: number, hovered: boolean): void;
    /**
     * Gets the hovered object if any.
     */
    getHoveredObject(): TileObject | undefined;
    clearHovered(): void;
    /**
     * Checks if there is any visible object.
     */
    hasVisibleObject(): boolean;
    /**
     * Checks if there is any invisible object.
     */
    hasInvisibleObject(): boolean;
    /**
     * Isolates given object.
     * Which means, other objects will be hidden or transparent.
     */
    /**
     * Isolates given objects.
     * Which means, other objects will be hidden or transparent.
     */
    setModelClipPlanes(modelId: number, planes: THREE.Plane[]): void;
    setGlobalClipPlanes(planes: THREE.Plane[]): void;
    showVertexNormals(show: boolean, size?: number): void;
    getLights(): {
        sun: THREE.DirectionalLight;
        ambient: THREE.Object3D<THREE.Object3DEventMap> | undefined;
        hemisphere: THREE.Object3D<THREE.Object3DEventMap> | undefined;
    };
    debugLights(enable: boolean): void;
    /**
     * Picks objects by mouse position.
     * First get the object through the gpu, and then get the specific intersection point
     */
    pickObjects(mousePosition: THREE.Vector2, layerChannels?: number[]): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
}
