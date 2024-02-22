import * as THREE from "three";
/**
 * Decodes an array (Uint8Array, etc.) to string.
 */
export declare function arrayToString(array: ArrayBufferLike): string;
/**
 * Gets tileObjectId by tilesetId and userId.
 * A tileObjectId is a 32-bit float number composed of an 8-bit tilesetId and 24-bit userId.
 * @param tilesetId A 8-bit number represents model's id, valid value is 0-255.
 * This means we can support a maximum of 255 bimtiles models.
 * @param userId A 24-bit number, valid value is 0-16777215 (0xffffff).
 * This means we can support a maximum of 16777215 primitives ( A familyinstance may have multiple primitives ) in a bimtiles model.
 */
export declare function tilesetAndUserId2TileObjectId(tilesetId: number, userId: number): number;
/**
 * Gets userId by tileObjectId.
 */
export declare function tileObjectId2UserId(tileObjectId: number): number;
/**
 * Gets tilesetId from color.
 * @param rgba Color value between 0 and 255.
 */
export declare function color2TilesetId(rgba: number[]): number;
/**
 * Gets userId from color.
 * @param rgba Color value between 0 and 255.
 */
export declare function color2UserId(rgba: number[]): number;
export declare function decodeNormal(normals: THREE.TypedArray): Float32Array;
