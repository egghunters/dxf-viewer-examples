import { DxfLayers, Viewer2d, PdfLayers, Plugin, PluginConfig } from "../../core";
/**
 * Dxf layer manager config.
 */
export interface LayerManagerPluginConfig extends Partial<PluginConfig> {
    /**
     * Container div id.
     */
    containerId: string;
    /**
     * If panel is visible. It is visible by default.
     */
    visible?: boolean;
}
/**
 * Layer manager plugin events.
 */
type LayerManagerPluginEvents = {
    /**
     * Panel visibility change event.
     */
    visibilitychange: boolean;
};
/**
 * Dxf layer manager.
 * Can be used by Viewer2d.
 */
export declare class LayerManagerPlugin extends Plugin<LayerManagerPluginEvents> {
    static readonly DEFAULT_ID = "LayerManagerPlugin";
    protected cfg: LayerManagerPluginConfig;
    protected container?: HTMLDivElement;
    protected layerMgrRoot?: HTMLDivElement;
    protected layerList?: HTMLDivElement;
    protected headerText?: HTMLSpanElement;
    protected closeBtn?: HTMLSpanElement;
    protected dxfLayersArray?: (DxfLayers | PdfLayers)[];
    protected checkboxes?: HTMLInputElement[];
    protected mouseDownPositionX: number;
    protected mouseDownPositionY: number;
    constructor(viewer: Viewer2d, cfg?: LayerManagerPluginConfig);
    protected init(): void;
    setVisible(visible: boolean): void;
    protected show(): void;
    protected hide(): void;
    destroy(): void;
    buildPage(): void;
    addContent(): void;
    generateListItem(layer: string, visible: boolean, color?: string): string;
    closePanel(): void;
    addEventHandlers(): void;
    protected onPointerDown: (e: MouseEvent) => void;
    protected onPointerMove: (e: MouseEvent) => void;
    protected onPointerUp: () => void;
    checkboxHandler(checkbox: HTMLInputElement): void;
    updatePage(): void;
    updateHeaderText(): void;
    convertDecimalToHex(decimal: number): string | undefined;
}
export {};
