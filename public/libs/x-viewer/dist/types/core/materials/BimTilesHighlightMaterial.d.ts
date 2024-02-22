import * as THREE from "three";
import { BimTilesMaterialParameters } from "./BimTilesMaterial";
/**
 * Material used for highlighting objects.
 */
export declare class BimTilesHighlightMaterial extends THREE.MeshStandardMaterial {
    isBimTilesHighlightMaterial: boolean;
    type: string;
    transparent: boolean;
    opacity: number;
    depthTest: boolean;
    side: 2;
    uniforms: {
        [uniform: string]: THREE.IUniform<any>;
    };
    vertexShader: string;
    fragmentShader: string;
    stateTexture: THREE.DataTexture;
    constructor(params: BimTilesMaterialParameters);
    setValues(params: BimTilesMaterialParameters): void;
}
