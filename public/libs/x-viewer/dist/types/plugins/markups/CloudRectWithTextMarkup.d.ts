import * as THREE from "three";
import type { MarkupPlugin } from "./MarkupPlugin";
import { DrawableData } from "../../core/canvas";
import { MarkupType } from "../../plugins/markups/Constants";
import { TextMarkup } from "../../plugins/markups/TextMarkup";
export interface CloudRectWithTextShape extends DrawableData {
    text: string;
    fontSize: number;
    textPosition: number[];
}
export declare class CloudRectWithTextMarkup extends TextMarkup {
    type: MarkupType;
    private textPosition;
    private controlPoints?;
    private vertexes?;
    private textBounds;
    text: string;
    fontSize: number;
    static LEADER_LINE_WIDTH: number;
    constructor(id: string, points: THREE.Vector3[], text?: string);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawCloudRect;
    private drawLeaderLine;
    protected drawText(ctx: CanvasRenderingContext2D, camera: THREE.Camera, text: string): void;
    translate(tx: number, ty: number): this;
    update(points: THREE.Vector3[]): this;
    getCloudPoints(): THREE.Vector3[];
    getBounds(): THREE.Box3;
    getVertexes(): THREE.Vector3[];
    isLeaderTextSelected(p: THREE.Vector3): boolean;
    translateLeaderText(tx: number, ty: number): this;
    isPointInPath(p: THREE.Vector3): boolean;
    setData(data: CloudRectWithTextShape): void;
    updateText(text: string): void;
    getData(): CloudRectWithTextShape;
    getClassType(): string;
    addInput(manager: MarkupPlugin, x: number, y: number): void;
    updateInputPosition(p1: THREE.Vector2, p2: THREE.Vector2): void;
    handleClick: () => void;
    handleInput: () => void;
    handleCompositionEnd: () => void;
    private calcInputPositionByText;
}
