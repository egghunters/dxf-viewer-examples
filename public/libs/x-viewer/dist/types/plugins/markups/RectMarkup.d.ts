import * as THREE from "three";
import { BaseMarkup } from "../../plugins/markups/BaseMarkup";
import { MarkupType } from "../../plugins/markups/Constants";
export declare class RectMarkup extends BaseMarkup {
    type: MarkupType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    isPointInPath(p: THREE.Vector3): boolean;
    getClassType(): string;
}
