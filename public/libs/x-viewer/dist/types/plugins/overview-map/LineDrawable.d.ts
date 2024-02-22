import * as THREE from "three";
import { Drawable } from "../../core/canvas/Drawable";
export interface LineDrawableConfig {
    positions: THREE.Vector3[];
    lineWidth?: number;
    lineColor?: [number, number, number, number];
    renderOrder?: number;
}
export declare class LineDrawable extends Drawable {
    renderOrder: number;
    positions: THREE.Vector3[];
    needsFrustumCulled: boolean;
    constructor(id: string, cfg: LineDrawableConfig);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawSelect(): void;
    getClassType(): string;
    isPointInPath(): boolean;
    getBBox(): THREE.Box3;
}
