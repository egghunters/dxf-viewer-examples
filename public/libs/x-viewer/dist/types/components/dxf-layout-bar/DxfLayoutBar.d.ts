import type { Viewer2d } from "../../core/viewers";
export declare class DxfLayoutBar {
    protected readonly viewer: Viewer2d;
    private element?;
    private content?;
    private itemList;
    constructor(viewer: Viewer2d);
    init(): void;
    private handleMouseWheel;
    private createItem;
    destroy(): void;
    show(): void;
    hide(): void;
}
export declare class ModelLayoutSwitchItem {
    protected readonly viewer: Viewer2d;
    private eventBus;
    element: HTMLElement;
    resetActivate?: () => void;
    active: boolean;
    constructor(viewer: Viewer2d, name: string);
    private createItem;
    setActive(active: boolean): void;
    resetActive(): void;
    destroy(): void;
}
