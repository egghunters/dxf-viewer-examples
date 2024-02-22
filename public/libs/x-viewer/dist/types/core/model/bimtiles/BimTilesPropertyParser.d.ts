import * as protobuf from "protobufjs";
import * as THREE from "three";
import { BimTilesMaterialJson, BimTilesUserDataJson, BimTilesUserIdJson, BimTilesUserIdBoxJson } from "./BimTilesData";
export declare class BimTilesPropertyParser {
    private baseUrl;
    private textureLoaderCache;
    private materialCache;
    private textureCache;
    private userDataCache;
    private familyInstanceIdCache;
    private familyInstanceAndUserIdsCache;
    private userIdAndUserDataCache;
    private userBoxCache;
    private protoRoot;
    preprocessURL: ((uri: string | URL) => string) | null;
    constructor(baseUrl: string, protoRoot: protobuf.Root);
    getProperty(url: string, fetchOptions: RequestInit | undefined, protobufType: string): Promise<any>;
    private getPropertyFromJson;
    private getPropertyFromBinary;
    private getTextureLoader;
    private loadTexture;
    private assignTexture;
    parseMaterial(json: BimTilesMaterialJson): Promise<void>;
    parseUserData(json: BimTilesUserDataJson): void;
    parseUserId(json: BimTilesUserIdJson): void;
    parseUserIdBox(json: BimTilesUserIdBoxJson, parentMatrix?: THREE.Matrix4): void;
    getMaterialParameters(userId: string): THREE.MeshStandardMaterialParameters | undefined;
    getUserData(userId: number): Record<string, any> | undefined;
    getFamilyInstanceIdsByModelId(modelId: string): string[] | undefined;
    getUserIdBox(userId: number): THREE.Box3 | undefined;
    /**
     * Gets all userIds of a model.
     */
    getUserIds(): number[];
    /**
     * Gets all userIds of the modelId and familyInstanceId
     */
    getUserIdsByFamilyInstanceId(modelId: string, familyInstanceId: string): number[];
    private getUserIdByUserDataIndex;
    getUserIdByFilter(filter: (userData: Record<string, any>) => boolean): number[];
    dispose(): void;
}
