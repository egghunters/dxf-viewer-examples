import { Toolbar } from "./Toolbar";
import { ToolbarConfig, ToolbarMenuId } from "./Toolbar.constants";
import { Plugin, type BaseViewer, PluginConfig } from "../../core/viewers";
/**
 * Viewer2d toolbar plugin config.
 */
export interface Viewer2dToolbarPluginConfig extends Partial<PluginConfig> {
    menuConfig: ToolbarConfig;
    groupConfig?: ToolbarMenuId[][] | string[][];
    markupMenuCfg?: ToolbarConfig;
    markupGroupCfg?: ToolbarMenuId[][] | string[][];
}
/**
 * Viewer2d toolbar plugin.
 */
export declare class Viewer2dToolbarPlugin extends Plugin {
    static readonly DEFAULT_ID = "Viewer2dToolbarPlugin";
    protected cfg: Viewer2dToolbarPluginConfig;
    protected toolbar: Toolbar;
    protected markupToolbar?: Toolbar;
    constructor(viewer: BaseViewer, cfg?: Viewer2dToolbarPluginConfig);
    getToolbar(): Toolbar;
    getMarkupToolbar(): Toolbar | undefined;
    /**
     * Sets a menu item to be active or inactive.
     */
    setActive(menuId: string, active: boolean): void;
    protected onMarkupActivated: () => void;
    protected onMarkupDeactivated: () => void;
    destroy(): void;
}
