import { Toolbar } from "./Toolbar";
import { ToolbarConfig, ToolbarMenuId } from "./Toolbar.constants";
import { type BaseViewer } from "../../core/viewers";
/**
 * @internal
 */
export declare const DefaultMarkupToolbarConfig: ToolbarConfig;
/**
 * @internal
 */
export declare const MarkupGroupConfig: ToolbarMenuId[][];
/**
 * @internal
 */
export declare class MarkupToolbar extends Toolbar {
    constructor(viewer: BaseViewer, menuCfg: ToolbarConfig, groupCfg?: ToolbarMenuId[][] | string[][]);
    keydown: () => void;
}
