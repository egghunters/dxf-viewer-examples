import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import type { MarkupPlugin } from "./MarkupPlugin";
import { DrawableData } from "../../core/canvas";
import { MarkupType } from "../../plugins/markups/Constants";
export declare enum TextMarkupEvent {
    EnterEditing = "enterediting",
    ExitEditing = "exitediting"
}
export interface TextShape extends DrawableData {
    text: string;
    fontSize: number;
}
export declare class TextMarkup extends BaseMarkup {
    text: string;
    fontSize: number;
    type: MarkupType;
    protected padding: number;
    static readonly DEFAULT_INPUT_WIDTH = 50;
    protected manager?: MarkupPlugin;
    protected textInput?: HTMLTextAreaElement;
    protected inputStatus: string;
    isEditing: boolean;
    constructor(id: string, points: THREE.Vector3[], text: string);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    protected drawText(ctx: CanvasRenderingContext2D, camera: THREE.Camera, text: string): void;
    setFontSize(fontSize: number): void;
    update(points: THREE.Vector3[]): this;
    setData(data: TextShape): void;
    updateText(text: string): void;
    getData(): TextShape;
    getClassType(): string;
    addInput(manager: MarkupPlugin, x?: number, y?: number): void;
    addInputEvents(): void;
    handleClick: () => void;
    handleKeydown: (e: KeyboardEvent) => void;
    handleInput: () => void;
    handleCompositionStart: () => void;
    handleCompositionEnd: () => void;
    handleBlur: () => void;
    handleFoucs: () => void;
    enterEditing(): void;
    exitEditing(): void;
}
