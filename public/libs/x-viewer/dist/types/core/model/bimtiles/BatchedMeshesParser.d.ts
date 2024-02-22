import * as THREE from "three";
import { BatchData, MeshJsonData } from "./BimTilesData";
/**
 * Batched mesh.
 */
export interface BatchedMesh {
    type: number;
    position: THREE.TypedArray;
    color: THREE.TypedArray;
    normal: THREE.TypedArray;
    indice: THREE.TypedArray;
    uv: THREE.TypedArray;
    tangent: THREE.TypedArray;
    barycentric: THREE.TypedArray;
    materialId: string;
    userIds: number[];
    batchTable: BatchData[];
}
/**
 * Parses batched meshes of a tile.
 */
export declare class BatchedMeshesParser {
    parse(buffer: ArrayBuffer, meshes: MeshJsonData[]): BatchedMesh[];
    private parseMesh;
    private parseTypedArray;
}
