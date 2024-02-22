import * as THREE from "three";
import { InstancedMeshData } from "./BimTilesData";
export interface InstancedMesh {
    type: number;
    position: THREE.TypedArray;
    color: THREE.TypedArray;
    normal: THREE.TypedArray;
    indice: THREE.TypedArray;
    uv: THREE.TypedArray;
    tangent: THREE.TypedArray;
    barycentric: THREE.TypedArray;
    userIds: number[];
    matrices: number[];
    materialId: string;
}
/**
 * Parses instanced meshes of a tile.
 */
export declare class InstancedMeshesParser {
    header?: {
        magic: string;
        version: number;
        byteLength: number;
    };
    static instanceDataMap: Record<string, InstancedMesh[]>;
    parse(instMeshDataArray: InstancedMeshData[], baseUrl: string, protoRoot?: protobuf.Root): Promise<InstancedMesh[]>;
    private parseInstanceBuffer;
    private parseInstanceProto;
    private parseMeshes;
    private parseMesh;
    private parseTypedArray;
    /**
     * Get InstancedMesh from cache or online.
     * @param url Instance full url for a particular LoD.
     */
    private getInstancedMeshByUrlAndBlobId;
}
