import * as THREE from "three";
/**
 * @internal
 */
export declare class MathUtils {
    static roundNumber(value: number, n: number): number;
    static floorNumber(value: number, n: number): number;
    static areNumbersEqual(a: number, b: number, epsilon?: number): boolean;
    static areVector2sEqual(a: THREE.Vector2, b: THREE.Vector2, epsilon?: number): boolean;
    static areVector3sEqual(a: THREE.Vector3, b: THREE.Vector3, epsilon?: number): boolean;
    static areNumbersClose(a: number, b: number, ref_tol?: number, abs_tol?: number): boolean;
    static areVector2sClose(point1: THREE.Vector2, point2: THREE.Vector2, ref_tol?: number, abs_tol?: number): boolean;
    static areVectorsClose(point1: THREE.Vector3, point2: THREE.Vector3, ref_tol?: number, abs_tol?: number): boolean;
    static getArcAngleSpanInRadian(startAngle: number, endAngle: number): number;
    static getIntegerPartLength(num: number): number;
    static getRelativeEps(num: number, epsilon?: number): number;
    static getVector2RelativeEps(vec: THREE.Vector2, epsilon?: number): number;
    static getControlPointByTwoPoints(p1: THREE.Vector2, p2: THREE.Vector2): THREE.Vector2;
    static convertPointFromUEToGltf(point: THREE.Vector3): THREE.Vector3;
    static convertPointFromGltfToUE(point: THREE.Vector3): THREE.Vector3;
    static convertPointFromUEToRevit(point: THREE.Vector3): THREE.Vector3;
    static convertPointFromRevitToUE(point: THREE.Vector3): THREE.Vector3;
    static getBox(point1: THREE.Vector3, point2: THREE.Vector3): number[];
    static getCenter(box: THREE.Box3): {
        x: number;
        y: number;
        z: number;
    };
    static convertBoxFromGltfToUE(box: THREE.Box3): number[];
    static convertBoxFromUEToGltf(box: THREE.Box3): number[];
    static convertBoxFromRevitToUE(box: THREE.Box3): number[];
    static convertBoxFromUEToRevit(box: THREE.Box3): number[];
    static clamp(value: number, min: number, max: number): number;
    static getLookAtMatrix(eye: THREE.Vector3, target: THREE.Vector3, up: THREE.Vector3): number[];
    static getLocationFromMatrix(matrix: THREE.Matrix4): THREE.Vector3;
    static toDegrees(radians: number): number;
    static toRadians(degrees: number): number;
    static signNotZero(v: number): 1 | -1;
    static fromSnorm(value: number, maxRange: number): number;
    static OctDecode(vec2: THREE.Vector2, vec3: THREE.Vector3, maxRange: number): void;
}
