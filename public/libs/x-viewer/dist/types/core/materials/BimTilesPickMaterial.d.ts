import * as THREE from "three";
import { BimTilesMaterialParameters } from "./BimTilesMaterial";
export declare class BimTilesPickMaterial extends THREE.ShaderMaterial {
    isBimTilesPickMaterial: boolean;
    type: string;
    stateTexture: THREE.DataTexture;
    constructor(params: BimTilesMaterialParameters);
    setValues(params: BimTilesMaterialParameters): void;
}
