import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import { MarkupType } from "./Constants";
import { CanvasRender, DrawableData } from "../../core/canvas";
import type { EventInfo } from "../../core/input-manager/InputManager";
import { UndoManager } from "../../core/undo";
import { Plugin, type BaseViewer } from "../../core/viewers";
export declare enum MarkupPluginEvent {
    StartDraw = "StartDraw",
    EndDraw = "EndDraw",
    EndEdit = "EndEdit"
}
export declare class MarkupPlugin extends Plugin<Record<MarkupPluginEvent, any>> {
    static readonly DEFAULT_ID = "MarkupPlugin";
    overlayRender: CanvasRender;
    private inputManager;
    private drawableList;
    private lineWidth;
    private lineColor;
    private fillColor;
    private fontSize;
    protected mouseDown: boolean;
    protected mouseDownPositionX?: number;
    protected mouseDownPositionY?: number;
    protected mousedownPoint?: THREE.Vector2;
    private isSelectLeaderText;
    private selectedShape?;
    private type?;
    private isDrawing;
    private initialDataForEditing?;
    private creatingShape?;
    private tempPoints;
    private activated;
    constructor(viewer: BaseViewer);
    get viewerCanvas(): HTMLCanvasElement;
    get camera(): THREE.OrthographicCamera | THREE.PerspectiveCamera;
    get raycaster(): THREE.Raycaster;
    get undoMgr(): UndoManager;
    setMarkupVisibility(id: string, visible: boolean): boolean;
    setMarkupsVisibility(visible: boolean): void;
    clear(): void;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
    getActiveMarkupType(): MarkupType | undefined;
    setDrawType(type: MarkupType): void;
    setLineWidth(linewidth: number): void;
    getLineWidth(): number;
    setLineColor(color: number[]): void;
    getLineColor(): number[];
    setFillColor(color: number[]): void;
    getFillColor(): number[];
    setFontSize(fontSize: number): void;
    getFontSize(): number;
    /**
     * Picks and get world position by screen position.
     */
    protected pickPositionByScreenPoint(p: THREE.Vector2): THREE.Vector3 | undefined;
    handleDbClick: () => void;
    handleInputMousemove: (e: MouseEvent) => void;
    mousedown: (e: EventInfo) => void;
    mousemove: (e: EventInfo) => void;
    mouseup: (e: EventInfo) => void;
    keydown: (e: EventInfo) => void;
    confirmToRemove(isConfirm: boolean): void;
    isEditing(): boolean;
    endEdit(selectMarkup: BaseMarkup): void;
    endDraw(createdMarkup?: BaseMarkup): void;
    cancelDraw(createdMarkup?: BaseMarkup): void;
    reset(): void;
    render(): void;
    addMarkup(markup: BaseMarkup, needFireEvent?: boolean): void;
    updateMarkup(markup: BaseMarkup, newData: DrawableData, needFireEvent?: boolean): void;
    removeMarkup(markup: BaseMarkup, needFireEvent?: boolean): void;
    removeMarkupById(id: string): boolean;
    createMarkup(data: DrawableData): BaseMarkup;
    getMarkupById(id: string): BaseMarkup;
    /**
     * Gets markup data.
     */
    getData(): DrawableData[];
    /**
     * Sets markup data.
     */
    setData(markupDatas: DrawableData[]): void;
    private isCreateLineMode;
    private isCreateDotMode;
    private isCreateTextMode;
    private isCreateShapeMode;
    private drawShape;
    private drawLine;
    private drawText;
    destroy(): void;
}
