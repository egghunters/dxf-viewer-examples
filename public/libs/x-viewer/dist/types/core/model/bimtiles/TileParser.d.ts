/**
 * Parses a tile.
 */
export declare class TileParser {
    parse(buffer: ArrayBuffer, baseUrl: string, protoRoot: protobuf.Root): Promise<{
        batchedMeshes: import("./BatchedMeshesParser").BatchedMesh[];
        instancedMeshes: import("./InstancedMeshesParser").InstancedMesh[];
    }>;
    private parseBinary;
    private parseProto;
}
