import type { Viewer2d } from "../viewers";
import { DxfChange } from "../../core/dxf";
import { Event } from "../../core/utils";
export declare class DxfCompareMarkupManager extends Event {
    private viewer;
    private overlayRender?;
    private drawableList;
    constructor(viewer: Viewer2d);
    drawCompareDrawable(changes: Record<string, DxfChange>): void;
    setCompareDrawableVisible(visilbe: boolean): void;
}
