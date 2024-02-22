import * as THREE from "three";
/**
 * BoxLine of a section box
 */
export declare class BoxLine extends THREE.LineSegments {
    private normalMaterial;
    private activeMaterial;
    /**
     * @param vertices two points of a line
     * @param faces two faces relative to a line
     */
    constructor(vertices: Array<THREE.Vector3>, faces: Array<BoxFace>);
    /**
     * Updates geometry
     */
    setFromPoints(vertices: THREE.Vector3[]): void;
    /**
     * Sets to active or inactive
     * @param isActive
     */
    setActive(isActive: boolean): void;
}
/**
 * BoxFace of a section box
 */
export declare class BoxFace extends THREE.Mesh {
    axis: string;
    lines: Array<BoxLine>;
    backFace: THREE.Mesh;
    vertices: THREE.Vector3[];
    /**
     * @param axis axis of a face
     * @param vertices 4 points of a face
     */
    constructor(axis: string, vertices: Array<THREE.Vector3>);
    /**
     * Updates geometry
     */
    setFromPoints(vertices: THREE.Vector3[]): void;
    /**
     * Sets to active or inactive
     * @param active
     */
    setActive(active: boolean): void;
}
