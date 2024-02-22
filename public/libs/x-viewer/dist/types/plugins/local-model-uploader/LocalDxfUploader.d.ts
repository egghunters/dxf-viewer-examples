import { IUploader } from "./IUploader";
import { Viewer2d, ModelConfig } from "../../core";
/**
 * @internal
 */
export declare class LocalDxfUploader extends IUploader {
    private viewer;
    private pdfWorker;
    onSuccess?: (event: any) => void;
    readonly defaultModelConfig: ModelConfig;
    constructor(viewer: Viewer2d, elementId?: string);
    setPdfWorker(pdfWorker: string): void;
    protected formats(): string[];
    protected uploadFiles(files: FileList): void;
    /**
     * Upload single dxf file.
     */
    private uploadSingleDxf;
    /**
     * Upload single dxf file.
     */
    private uploadSinglePdf;
}
