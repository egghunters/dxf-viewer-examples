import * as THREE from "three";
import { Drawable } from "../../core/canvas/Drawable";
export interface TextStyle {
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
    fontColor?: string;
    outlineColor?: string;
    outlineWidth?: number;
    backgroundColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
}
export interface TextDrawableConfig {
    text: string;
    position: THREE.Vector3;
    radius?: number;
    displayRadius?: number;
    offset?: THREE.Vector2;
    textStyle?: TextStyle;
    size?: {
        width: number;
        height: number;
    };
    renderOrder?: number;
}
export declare class TextDrawable extends Drawable {
    renderOrder: number;
    text: string;
    position: THREE.Vector3;
    offset: THREE.Vector2;
    size: {
        width: number;
        height: number;
    };
    textStyle: TextStyle;
    displayRadius: number;
    radius?: number;
    needsFrustumCulled: boolean;
    constructor(id: string, cfg: TextDrawableConfig);
    private getFont;
    drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, cameraPosition: THREE.Vector2, bClippable: boolean): void;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawSelect(): void;
    getClassType(): string;
    isPointInPath(): boolean;
    getBBox(): THREE.Box3;
}
