import * as THREE from "three";
import { MeshStandardMaterialParameters } from "three";
export interface BimTilesMaterialParameters extends MeshStandardMaterialParameters {
    stateTexture: THREE.DataTexture;
}
/**
 * Customized material used by bimtiles.
 */
export declare class BimTilesMaterial extends THREE.MeshStandardMaterial {
    isBimTilesMaterial: boolean;
    type: string;
    uniforms: {
        [uniform: string]: THREE.IUniform<any>;
    };
    vertexShader: string;
    fragmentShader: string;
    stateTexture: THREE.DataTexture;
    readonly defaultOutlineColor: THREE.Color;
    protected useBCOutline: boolean;
    protected outlineVisible: boolean;
    constructor(params: BimTilesMaterialParameters);
    setOutlineVisible(visible: boolean): void;
    enableOutline(enable: boolean): void;
    setOutLineColor(color?: THREE.Color): void;
    setValues(params: BimTilesMaterialParameters): void;
}
