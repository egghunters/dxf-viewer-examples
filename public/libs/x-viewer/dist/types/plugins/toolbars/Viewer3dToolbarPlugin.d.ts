import { Toolbar } from "./Toolbar";
import { ToolbarConfig, ToolbarMenuId } from "./Toolbar.constants";
import { Plugin, type BaseViewer, PluginConfig } from "../../core/viewers";
/**
 * Viewer3d toolbar plugin config.
 */
export interface Viewer3dToolbarPluginConfig extends Partial<PluginConfig> {
    menuConfig: ToolbarConfig;
    groupConfig?: ToolbarMenuId[][] | string[][];
}
/**
 * Viewer3d toolbar plugin.
 */
export declare class Viewer3dToolbarPlugin extends Plugin {
    static readonly DEFAULT_ID = "Viewer3dToolbarPlugin";
    protected cfg: Viewer3dToolbarPluginConfig;
    private toolbar;
    constructor(viewer: BaseViewer, cfg?: Viewer3dToolbarPluginConfig);
    getToolbar(): Toolbar;
    /**
     * Sets a menu item to be active or inactive.
     */
    setActive(menuId: string, active: boolean): void;
    destroy(): void;
}
