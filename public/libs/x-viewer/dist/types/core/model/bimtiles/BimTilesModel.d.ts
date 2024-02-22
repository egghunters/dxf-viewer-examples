import * as THREE from "three";
import { TileObject, ModelData3d } from "../Constants";
import { Model } from "../Model";
import { BimTilesConfigMetadata, BimTilesConfigParser, BimTilesConfigStatistics } from "./BimTilesConfigParser";
import { BimTilesMaterialManager } from "./BimTilesMaterialManager";
import { BimTilesRenderer } from "./BimTilesRenderer";
export declare class BimTilesModel extends Model {
    /**
     * ModelId for BimTiles is actually tilesetId, it is a number (0-255), but we use it as a string.
     */
    modelId: string;
    _bbox?: THREE.Box3;
    tilesRenderer: BimTilesRenderer;
    metadata: BimTilesConfigMetadata;
    statistics: BimTilesConfigStatistics;
    constructor(modelData: ModelData3d, baseUrl: string, bimTilesCfg: BimTilesConfigParser);
    getTilesRenderer(): BimTilesRenderer;
    get materialManager(): BimTilesMaterialManager;
    get propertyParser(): import("./BimTilesPropertyParser").BimTilesPropertyParser;
    get highlighUsageGroup(): THREE.Group<THREE.Object3DEventMap>;
    get transparentUsageGroup(): THREE.Group<THREE.Object3DEventMap>;
    get pickUsageGroup(): THREE.Group<THREE.Object3DEventMap>;
    getModelObject(): THREE.Object3D;
    private traverseObjectByUserId;
    getObjectByUserId(userId: number): THREE.Object3D | undefined;
    getBBox(): THREE.Box3;
    setObjectHoveredByUserId(userId: number, hovered: boolean): void;
    clearHovered(): void;
    /**
     * Highlights an object by userId.
     */
    setObjectHighlightedByUserIds(userIds: number[], highlight: boolean): void;
    clearHighlight(): void;
    setObjectOpacityByUserIds(userIds: number[], opacity: number): void;
    clearObjectOpacityByUserIds(userIds: number[]): void;
    setOpacity(opacity: number): void;
    clearOpacity(): void;
    /**
     * Sets current tileset visible or invisible.
     */
    setVisible(visible: boolean): void;
    setObjectVisibleByUserIds(userIds: number[], visible: boolean): void;
    /**
     * Checks if there is any visible object.
     */
    hasVisibleObject(): boolean;
    /**
     * Checks if there is any invisible object.
     */
    hasInvisibleObject(): boolean;
    /**
     * Gets the hovered object if any.
     */
    getHoveredObject(): TileObject | undefined;
    getBBoxByUserId(userId: number): THREE.Box3 | undefined;
    getUserDataByUserId(userId: number): Record<string, any> | undefined;
    /**
     * Gets all userIds of a tileset.
     */
    getUserIds(): number[];
    getUserId(modelId: string, familyInstanceId: string): number[];
    getUserData(modelId: string, familyInstanceId: string): Record<string, any> | undefined;
    getUserIdByFilter(filter: (userData: Record<string, any>) => boolean): number[];
    setClipPlanes(planes: THREE.Plane[]): void;
}
