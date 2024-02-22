import * as dat from "dat.gui";
import { Plugin, Viewer3d } from "../../core/viewers";
/**
 * Can be used by Viewer3d and BimTilesViewer.
 * @internal
 */
export declare class Viewer3dDatGuiPlugin extends Plugin {
    protected viewer: Viewer3d;
    gui?: dat.GUI;
    /**
     *
     * @param viewer pass in the Viewer3D, so we can reference its data members
     */
    constructor(viewer: Viewer3d);
    /**
     * Defined all controls here, which will be displyed in dat.GUI
     * Color should follow these formats:
     * '#ffffff', [0, 0, 0], [0, 0, 0, 0.5], \{ h: 100, s: 0.9, v: 0.3 \}
     */
    readonly controls: {
        showGroundGrid: boolean;
        showGroundGrass: boolean;
        skyMode: string[];
        environments: string[];
        homeView: () => void;
        views: string[];
        OrthographicCamera: boolean;
        viewpoints: boolean;
        annotations: boolean;
        takeSnapshot: () => void;
        takeSnapshotForViewerBBox: () => void;
        fullScreen: () => void;
        webcam: boolean;
        uploadFile: () => void;
        showBimTree: boolean;
        showPropertyPanel: boolean;
        transparentMode: boolean;
        showVertexNormals: boolean;
        explode: number;
        sectionMode: string[];
        alVisible: boolean;
        alColor: string;
        alIntensity: number;
        dlColor: string;
        showDlHelper: boolean;
        hlVisible: boolean;
        hlIntensity: number;
        hlColor: number[];
        hlGroundColor: number[];
        fogEnabled: boolean;
        fogColor: number;
        fogNearDistance: number;
        fogFarDistance: number;
        distanceCullingFactor: number;
    };
    /**
     * Init dat.GUI
     */
    init(): void;
    open(): void;
    close(): void;
    destroy(): void;
}
