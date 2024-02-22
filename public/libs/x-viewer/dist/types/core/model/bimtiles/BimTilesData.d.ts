import * as THREE from "three";
export declare const WEBGL_MAG_FILTERS: Record<number, THREE.MagnificationTextureFilter>;
export declare const WEBGL_MIN_FILTERS: Record<number, THREE.MinificationTextureFilter>;
export declare const WEBGL_WRAPPINGS: Record<number, THREE.Wrapping>;
/**
 * "Alpha mode" refers to the way in which transparency is handled.
 */
export declare enum AlphaMode {
    /**
     * No transparency, and the image is fully visible.
     */
    Opaque = "OPAQUE",
    /**
     * Transparency is achieved by using a separate mask layer that specifies which parts of the image should be transparent.
     */
    Mask = "MASK",
    /**
     * Transparency is achieved by blending the image with the background based on the alpha channel values of the image.
     */
    Blend = "BLEND"
}
/**
 * BimTiles definition.
 */
export interface BimTilesJson {
    asset: {
        version: string;
        generateTool: string;
        datetime: string;
    };
    properties: {
        material: {
            url: string;
        };
        userData: {
            url: string;
        };
        userId: {
            url: string;
            maxUserIdIndex: number;
        };
        userIdBox: {
            url: string;
        };
    };
    root: {
        id: string;
        transform: number[];
        boundingVolume: number[];
        refine: "replace" | "add";
        geometricError: number;
        content: {
            uri: string;
        };
        children: [];
    };
}
/**
 * BimTiles material texture definition.
 */
export interface BimTilesMaterialTextureJson {
    index: number;
    texCoord: number;
    transform?: {
        offset: [number, number];
        rotation: number;
        scale: [number, number];
    };
}
/**
 * BimTiles materials definition.
 */
export interface BimTilesMaterialJson {
    materials: {
        /**
         * The key is material id.
         */
        [key: string]: {
            /**
             * Material id, unique in this tile set
             */
            id: string;
            name: string;
            baseColorFactor: number[];
            baseColorTexture: BimTilesMaterialTextureJson;
            metallicFactor: number;
            roughnessFactor: number;
            metallicRoughnessTexture: BimTilesMaterialTextureJson;
            doubleSided: boolean;
            alphaMode: AlphaMode;
            alphaCutoff: number;
            normalTexture: BimTilesMaterialTextureJson;
            emissiveFactor: number[];
            emissiveTexture: BimTilesMaterialTextureJson;
            occlusionTexture: BimTilesMaterialTextureJson;
        };
    };
    textures: {
        image: number;
        sampler: number;
    }[];
    images: {
        uri: string;
        type: string;
        width: number;
        height: number;
        dimensions: number;
    }[];
    samplers: {
        magFilter: number;
        minFilter: number;
        wrapS: number;
        wrapT: number;
    }[];
}
/**
 * BimTiles UserData definition.
 * These userData are usually familyInstance attributes.
 */
export interface BimTilesUserDataJson {
    /**
     * Stores all userData's keys, case-sensitive.
     * Because a lot of userData keys are the same, we can save space this way.
     */
    userDataKeys: string[];
    /**
     * Stores all userData's values, case-sensitive.
     * Because a lot of userData values are the same, we can save space this way.
     */
    userDataValues: any[];
    userDataItems: Record<number, number>[];
}
/**
 * BimTiles UserId definition.
 * A tile set has one userId file.
 */
export interface BimTilesUserIdJson {
    /**
     * Stores all modelIds of this tile set.
     * ModelId is required, and must be unique in a tile set.
     */
    modelIds: string[];
    /**
     * Stores all familyInstanceIds for all models of this tile set.
     * FamilyInstanceId is nice to have, otherwise, it'll generate one, but it won't be able to
     * find an object's userData.
     * A familyInstance may contain more than one primitives, thus may have more than one userIds.
     */
    familyInstanceIds: string[];
    /**
     * ModelId and familyInstanceIds map.
     * One modelId contains at least one familyInstanceIds.
     * The key is the index of modelIds array, we can find the modelId by this index.
     * The value is the index array of familyInstanceIds, we can find familyInstanceIds by these indexes.
     */
    modelTable: Record<number, number[]>;
    /**
     * UserId and userData map.
     * One userId maps to 0 or 1 userData.
     * The key is userId.
     * In order to get proper userData, we also need to know modelId and familyInstanceId.
     * So, the value is a tuple of modelId index, familyInstanceId index and userData index.
     * If a primitive doesn't has userData, the userData index is -1.
     */
    userIdTable: Record<number, [number, number, number]>;
}
/**
 * UserId bounding box definition.
 * The key is userId.
 * The vlaue is bounding box value, in order of xmin, ymin, zmin, xmax, ymax, zmax.
 */
export type BimTilesUserIdBoxJson = Record<number, number[]>;
export type BimTilesProperty = BimTilesMaterialJson | BimTilesUserDataJson | BimTilesUserIdJson | BimTilesUserIdBoxJson;
export declare const WEBGL_COMPONENT_TYPES: {
    int8: Int8ArrayConstructor;
    uint8: Uint8ArrayConstructor;
    int16: Int16ArrayConstructor;
    uint16: Uint16ArrayConstructor;
    int32: Int32ArrayConstructor;
    uint32: Uint32ArrayConstructor;
    float: Float32ArrayConstructor;
    double: Float64ArrayConstructor;
};
interface ComponentTypes {
    int8: Int8ArrayConstructor;
    uint8: Uint8ArrayConstructor;
    int16: Int16ArrayConstructor;
    uint16: Uint16ArrayConstructor;
    int32: Int32ArrayConstructor;
    uint32: Uint32ArrayConstructor;
    float: Float32ArrayConstructor;
    double: Float64ArrayConstructor;
}
export declare enum WEBGL_TYPE_SIZES {
    scalar = 1,
    vec2 = 2,
    vec3 = 3,
    vec4 = 4,
    mat2 = 4,
    mat3 = 9,
    mat4 = 16
}
/**
 * Definition of a concrete instance.
 */
export interface Instance {
    /**
     * The transform of the instance.
     */
    transform: number[];
    /**
     * The userId of the instance.
     */
    userId: number;
}
/**
 * Definition of an instanced mesh data and concrete instances.
 */
export interface InstancedMeshData {
    blobId: number;
    url: string;
    instances: Instance[];
}
/**
 * Definition of a buffer.
 */
export interface MeshBufferData {
    byteOffset: number;
    byteLength: number;
    componentType: keyof ComponentTypes;
    type: WEBGL_TYPE_SIZES;
    count: number;
    max?: number[];
    min?: number[];
}
/**
 * Definition for a primitive of a batch.
 */
export interface BatchData {
    userId: number;
    indexStart: number;
    indexCount: number;
    positionStart: number;
    positionCount: number;
}
export interface MeshJsonData {
    byteOffset: number;
    byteLength: number;
    buffers: MeshBufferData[];
    primitive: {
        type: number;
        position: number;
        normal: number;
        tangent: number;
        indice: number;
        uv_0: number;
        color?: number;
        barycentric: number;
        material: string;
        materialId: string;
        normalCompressed: boolean;
    };
    batchTable: BatchData[];
}
export interface InstancedMeshJsonData {
    meshes: MeshJsonData[];
}
/**
 * Definition of a tile.
 * A tile can contain both instanced and batched mesh.
 * A tile may contain part of (not all) primitives of an instance.
 *   e.g., an instance has 10 concrete primitives, a tile may contain 3 of them.
 * A tile may contain part of (not all) primitives of a batch.
 *   e.g., a batch has 10 primitives, a tile may contain 3 of them.
 */
export interface TileJsonData {
    instancedMeshes: InstancedMeshData[];
    batchedMeshes: MeshJsonData[];
}
export {};
