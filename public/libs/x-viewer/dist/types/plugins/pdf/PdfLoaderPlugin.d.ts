import * as THREE from "three";
import { PdfLoader } from "./PdfLoader";
import { BaseViewer, Model2dConfig, FontManager, Plugin, PluginConfig, Model2d } from "../../core";
/**
 * Pdf loader plugin config.
 */
export interface PdfLoaderPluginConfig extends Partial<PluginConfig> {
    font?: FontManager;
    /**
     * Whether to use progressive load or not.
     * @default true
     */
    enableProgressiveLoad?: boolean;
    pdfWorker: string;
}
/**
 * Pdf loader plugin.
 */
export declare class PdfLoaderPlugin extends Plugin {
    static readonly DEFAULT_ID = "PdfLoaderPlugin";
    protected cfg: PdfLoaderPluginConfig;
    loader?: PdfLoader;
    constructor(viewer: BaseViewer, cfg: PdfLoaderPluginConfig);
    /**
     * Loads a pdf.
     * @param modelCfg
     * @param onProgress
     * @returns
     */
    loadAsync(modelCfg: Model2dConfig, onProgress: (event: ProgressEvent) => void): Promise<Model2d>;
    /**
     *
     * @param page
     * @param onProgress
     * @returns
     * @description load specified pdf page
     */
    loadPage(page: number, onProgress?: (event: ProgressEvent) => void): Promise<undefined>;
    /**
     *
     * @returns {Number}
     * @description Get pdf pages number.
     */
    getPageCount(): number;
    private getPdfViewport;
    worldPosition2PdfPoint(position: THREE.Vector2): THREE.Vector2;
    pdfPoint2WorldPosition(point: THREE.Vector2): THREE.Vector2;
}
