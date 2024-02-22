import * as THREE from "three";
import { DrawableData } from "../../core/canvas/Constants";
import { Drawable } from "../../core/canvas/Drawable";
import type { TextMarkup } from "../../plugins/markups/TextMarkup";
/**
 * Markup for Viewer2d contains additional information, e.g. layoutName.
 *
 * Viewer2d doesn't maintain the relationship between model and markup data,
 * business logic should knows which model a set of markup data belong to.
 */
export type MarkupData = DrawableData;
export declare abstract class BaseMarkup extends Drawable {
    protected editPointSize: number;
    protected editPointFillColor: string;
    protected editPointStrokeColor: string;
    protected ctx?: CanvasRenderingContext2D;
    leaderText?: TextMarkup;
    parent?: BaseMarkup;
    constructor(id: string);
    isSelected(): boolean;
    drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawPoints;
    setEditPointSize(size: number): void;
    setEditPointFillColor(color: string): void;
    setEditPointStrokeColor(color: string): void;
    getCenter(): THREE.Vector3;
    isPointInPath(p: THREE.Vector3): boolean;
    setData(data: DrawableData): void;
    setParent(parent: BaseMarkup): void;
    setLeaderText(textMarkup: TextMarkup): void;
    update(points: THREE.Vector3[]): this;
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
}
