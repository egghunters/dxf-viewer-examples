import * as THREE from "three";
import { BaseViewer, Plugin, PluginConfig } from "../../core";
/**
 * Ground grid plugin.
 */
export interface GroundGridPluginConfig extends Partial<PluginConfig> {
    /**
     * Ground size.
     */
    size?: number;
    /**
     * Number of divisions.
     */
    divisions?: number;
    /**
     * If ground grid is visible. It is visible by default.
     */
    visible?: boolean;
}
/**
 * Ground grid plugin.
 * Can be used by Viewer3d.
 */
export declare class GroundGridPlugin extends Plugin {
    static readonly DEFAULT_ID = "GroundGridPlugin";
    protected readonly NAME = "GROUND_GRID";
    protected readonly DEFAULT_SIZE = 1000;
    protected readonly DEFAULT_DIVISIONS = 100;
    protected readonly DEFAULT_MAT_PARAMS: {
        color: number;
        transparent: boolean;
        opacity: number;
        wireframeLinewidth: number;
    };
    protected cfg: GroundGridPluginConfig;
    protected gridHelper?: THREE.GridHelper;
    constructor(viewer: BaseViewer, cfg?: GroundGridPluginConfig);
    protected init(): void;
    setVisible(visible: boolean): void;
    protected onModelLoaded: () => void;
    /**
     * Creates ground grid
     */
    protected createGroundGrid(size?: number, divisions?: number, groundCenter?: THREE.Vector3): THREE.GridHelper;
    destroy(): void;
}
