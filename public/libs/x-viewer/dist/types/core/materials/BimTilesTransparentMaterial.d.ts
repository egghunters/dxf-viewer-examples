import * as THREE from "three";
import { BimTilesMaterialParameters } from "./BimTilesMaterial";
/**
 * Material used for transparent objects.
 */
export declare class BimTilesTransparentMaterial extends THREE.MeshStandardMaterial {
    isBimTilesTransparentMaterial: boolean;
    type: string;
    transparent: boolean;
    opacity: number;
    side: 0;
    uniforms: {
        [uniform: string]: THREE.IUniform<any>;
    };
    vertexShader: string;
    fragmentShader: string;
    stateTexture: THREE.DataTexture;
    constructor(params: BimTilesMaterialParameters);
    setValues(params: BimTilesMaterialParameters): void;
}
