import * as THREE from "three";
import { TileObject } from "../Constants";
import type { BimTilesRenderer } from "./BimTilesRenderer";
import { BimTilesMaterial, BimTilesPickMaterial, BimTilesTransparentMaterial, BimTilesHighlightMaterial } from "../../../core/materials";
/**
 * Object state type, which can be "Hidden", "Transparent", "Highlighted" or "Hovered".
 * Each tile object (maps to a userId) has a "color" (8 bytes) value that contains
 * State types, opacity value, etc.
 * - State types are stored in color.r
 *   - bit 0: Hidden
 *   - bit 1: Transparent
 *   - bit 2: Hovered
 *   - bit 3: Highlighted
 *   - bit 4-7: not used for now
 * - Opacity value is stored in color.g (value between 0 to 1)
 * - color.b for transparent effect ( used by cloned mesh), currently only bit 0 is used.
 * - color.a is not used for now
 *
 * All tile object states of a tileset are stored in a stateTexture,
 * which will be send to GPU, thus GPU knows which tile object should
 * be hidden/transparent/hovered/highlighted.
 */
export declare enum StateType {
    /**
     * Hide a tile object.
     */
    Hidden = 0,
    /**
     * Transparent is implemented by cloning objects' mesh (don't clone geometry) and
     * apply a transparent material.
     */
    Transparent = 1,
    /**
     * We implement highlight by cloning mesh and apply a highlight material.
     * There can be transparent objects and highlighted objects in the same time.
     * But, one object is either transparent or highlighted.
     */
    Highlighted = 2,
    /**
     * There should only one object being hovered!
     * We implement hover effect by blending an object's color in shader.
     */
    Hovered = 3
}
export declare class BimTilesMaterialManager {
    private _pickMaterial?;
    private _highlightMaterial?;
    private _transparentMaterial?;
    private stateTexture;
    protected batchMaterialMap: Map<string, BimTilesMaterial>;
    protected instanceMaterialMap: Map<string, BimTilesMaterial>;
    tileRenderer: BimTilesRenderer;
    highlightMesh?: THREE.Mesh;
    constructor(tileRenderer: BimTilesRenderer, modelCfg: any);
    createBatchMaterial(materialId: string, params?: THREE.MeshStandardMaterialParameters, hasBarycentric?: boolean): BimTilesMaterial | undefined;
    createInstanceMaterial(materialId: string, params?: THREE.MeshStandardMaterialParameters, hasBarycentric?: boolean): BimTilesMaterial | undefined;
    get highlightMaterial(): BimTilesHighlightMaterial;
    get transparentMaterial(): BimTilesTransparentMaterial;
    get pickMaterial(): BimTilesPickMaterial;
    /**
     * Creates a DataTexture to store objects' states.
     * todo: The width and height of texture can't exceed the maximum size supported by the current gpu.
     */
    private createStateTexture;
    /**
     * Updates state.
     * @param opacity Useful for StateType.Transparent, and when flag is true.
     */
    updateState(state: StateType, userIds: number[], flag: boolean, opacity?: number): void;
    private setHiddenForTransparent;
    private updateClonedTransparentMesh;
    private clearClonedTransparentMesh;
    private cloneMeshForTransparent;
    private disposeClonedTransparentMesh;
    private updateAllClonedTransparentMesh;
    private clearAllClonedTransparentMesh;
    /**
     * Sets current tileset visible or invisible.
     */
    setHidden(flag: boolean): void;
    /**
     * Sets current tileset's opacity.
     * @param opacity A value between 0 and 1, and will be converted to 0-255.
     * opacity is 1 means to clear opacity.
     */
    setOpacity(opacity: number): void;
    /**
     * Clears hovered object.
     * We don't store the hovered userId, simply clear the flag for all userIds.
     */
    clearHovered(): void;
    updateHighlightMesh(): void;
    clearHighlightMesh(): void;
    clearState(state: StateType): void;
    setClipPlanes(planes: THREE.Plane[]): void;
    resetState(): void;
    updateMaterialStates(): void;
    dispose(): void;
    private disposeMesh;
    /**
     * Checks if there is any visible object.
     */
    hasVisibleObject(): boolean;
    /**
     * Checks if there is any invisible object.
     */
    hasInvisibleObject(): boolean;
    /**
     * Get transparent userIds.
     */
    getTransparentUserIds(): number[];
    /**
     * Get highlight userIds.
     */
    getHighlightUserIds(): number[];
    /**
     * Gets the hovered object if any.
     */
    getHoveredObject(): TileObject | undefined;
    /**
     * Converts an opacity value between 0-1 to value 0-255. For values:
     * 0: actually equals to hidden, we'll convert it to 1 in shader.
     * [0, 1): will be mapped to integer between [1, 255]
     * 1: will be mapped to 0 in shader.
     */
    private opacity2Int8;
    /**
     * Sets the flag(0 or 1) of a number by given StateType.
     * @param num A number between 0 and 255.
     */
    private setFlag;
    /**
     * Gets the flag(0 or 1) from a number by given StateType.
     * @param num A number between 0 and 255.
     */
    private getFlag;
}
