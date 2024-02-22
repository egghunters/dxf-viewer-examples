import * as THREE from "three";
export declare class GradientColorSkybox extends THREE.Mesh {
    static readonly NAME = "SKYBOX";
    static readonly MIN_SKY_RADIUS = 4000;
    static readonly MAX_SKY_RADIUS = 20000;
    private vertexShader;
    private fragmentShader;
    constructor(topColor: THREE.Color, skylineColor: THREE.Color, bottomColor: THREE.Color, radius?: number, widthSegments?: number, heightSegments?: number, skyCenter?: THREE.Vector3, sunDirection?: THREE.Vector3);
}
