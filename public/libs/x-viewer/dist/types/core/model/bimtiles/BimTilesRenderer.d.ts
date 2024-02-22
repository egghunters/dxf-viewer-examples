import { Tile, TilesRenderer } from "3d-tiles-renderer";
import * as THREE from "three";
import { BimTilesJson } from "./BimTilesData";
import { BimTilesMaterialManager } from "./BimTilesMaterialManager";
import { BimTilesPropertyParser } from "./BimTilesPropertyParser";
/**
 * @link https://github.com/NASA-AMMOS/3DTilesRendererJS#tilesrenderer
 * @example
 * BimTilesRenderer
 *     |
 * tileRender.loadRootTileSet(tileSet)
 *     |
 * tileRender.update()
 *     |
 * traverse tile
 *     |
 * tileRender.requestTileContents(tile) --------- downloadQueue, parseQueue
 *                                                         |
 *                                                tileRender.tileInView(tile)
 *                                                         |
 * tileRender.setTileVisible(tile, visible)------- tileRender.calculateError(tile)
 */
export declare class BimTilesRenderer extends TilesRenderer {
    highlighUsage: THREE.Group;
    transparentUsage: THREE.Group;
    pickUsage: THREE.Group;
    materialManager?: BimTilesMaterialManager;
    baseUrl: string;
    propertyParser: BimTilesPropertyParser;
    tilesetId: number;
    onBeforeParseTile?: (tile: Tile) => void;
    private protoRoot;
    constructor(url: string, tilesetId: number);
    private getVertexColorArray;
    private createBatchedMesh;
    private createInstancedMesh;
    /**
     * Gets cloned geometries by given userIds.
     */
    getGeometryByUserIds(userIds: number[]): THREE.BufferGeometry;
    parseTile(buffer: ArrayBuffer, tile: any, extension: any): Promise<void>;
    disposeTile(tile: any): void;
    preprocessNode(tile: any, tileSetDir: string, parentTile?: Tile): void;
    fetchTileSet(url: string, fetchOptions: RequestInit, parent?: undefined): Promise<BimTilesJson>;
    loadRootTileSet(url: string): Promise<any>;
    update(): void;
    setTileVisible(tile: any, visible: boolean): void;
    calculateError(tile: Tile): void;
}
