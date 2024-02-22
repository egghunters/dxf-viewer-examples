import * as THREE from "three";
export interface BimTilesConfigMetadata {
    asset: string;
    version: string;
    generateTool?: string;
    datetime: string;
    root: string;
    modelSize: number;
}
export interface BimTilesConfigStatistics {
    elementCount: number;
    batchElementCount: number;
    instanceElementCount: number;
    batchCount: number;
    instanceCount: number;
    tileCount: number;
    userDataCount: number;
    materialCount: number;
    meshVertexCount: number;
    meshFaceCount: number;
    textureCount: number;
    texturePixels: number;
}
interface BimTilesConfigView {
    transform: THREE.Matrix4;
    boundingVolume: THREE.Box3;
}
/**
 * BimTiles config definition.
 * A bimtiles has one config file.
 */
export declare class BimTilesConfigParser {
    private url;
    private metadata;
    private statistics;
    private view;
    constructor(url: string);
    parse(): Promise<boolean>;
    getMetadata(): BimTilesConfigMetadata;
    getStatistics(): BimTilesConfigStatistics;
    getView(): BimTilesConfigView;
}
export {};
