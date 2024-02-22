import * as THREE from "three";
import { TileObject } from "../model";
import type { BaseViewer } from "../../core/viewers";
export declare class PickManager {
    private readonly CLEAR_COLOR;
    private readonly CLEAR_COLOR_ALPHA;
    private readonly EMPTY_MODEL_ID;
    private viewer;
    private raycaster;
    private pickingTexture;
    constructor(viewer: BaseViewer);
    get scene(): THREE.Scene;
    get camera(): THREE.OrthographicCamera;
    get renderer(): THREE.WebGLRenderer;
    get overlayRender(): import("..").CanvasRender;
    get viewerContainer(): HTMLElement;
    getRaycaster(): THREE.Raycaster;
    /**
     * Picks objects by NDC coordinate.
     */
    pickObjectsByNdc(ndcCoord: THREE.Vector2, objects: THREE.Object3D[], layerChannels?: number[]): THREE.Intersection[];
    /**
     * Picks the closest object by mouse position.
     */
    pickObject(mousePosition: THREE.Vector2, objects: THREE.Object3D[], layerChannels?: number[]): THREE.Intersection | undefined;
    /**
     * Picks objects by mouse position.
     */
    pickObjects(mousePosition: THREE.Vector2, objects: THREE.Object3D[], layerChannels?: number[]): THREE.Intersection[];
    /**
     * Picks a drawable by world position.
     */
    pickDrawable(worldPosition: THREE.Vector3): import("..").Drawable<Record<string, unknown>>[];
    /**
     * Picks an object by mouse position.
     */
    pick(mousePosition: THREE.Vector2, pickScene: THREE.Scene): TileObject | undefined;
    /**
     * Sets raycaster's layer channels.
     */
    private setLayerChannels;
    /**
     *
     * @param mousePosition
     * @param width
     * @param height
     * @param pickScene
     * @returns
     * @description pick rect area buffer
     */
    private pickBuffer;
}
