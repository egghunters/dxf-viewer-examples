import { type BaseViewer } from "../../core/viewers";
import { Plugin } from "../../core/viewers/Plugin";
import { BaseSection } from "../../plugins/sections/BaseSection";
/**
 * Section type
 */
export declare enum SectionType {
    ObjectsBoxSection = "ObjectsBoxSection",
    PickPlaneSection = "PickPlaneSection",
    AxisPlaneSection = "AxisPlaneSection"
}
/**
 * Section plugin, can be used by Viewer3d and BimTilesViewer.
 */
export declare class SectionPlugin extends Plugin {
    static readonly DEFAULT_ID = "SectionPlugin";
    private sections;
    private activeSectionType?;
    private lastRenderAutoClear;
    private backMaterial?;
    private frontMaterial?;
    private enableSelection?;
    constructor(viewer: BaseViewer);
    protected get raycaster(): any;
    private onBeforeRender;
    private onAfterRender;
    private createCapStencilMaterials;
    private render;
    /**
     * Activates one of "ObjectsBoxSection", "AxisPlaneSection" or "PickPlaneSection" Section
     * @param {SectionType} type
     * @param clippingObjectIds
     */
    activate(type: SectionType): void;
    /**
     * @description Deactivate Section plugin
     * @param keepSectionState Keep objects being clipped even after deactived.
     */
    deactivate(keepSectionState?: boolean): void;
    /**
     * Resets section to initial state.
     */
    reset(): void;
    /**
     * Sets gizmo and section plane mesh visibility.
     */
    setSectionPlaneVisible(visible: boolean): void;
    /**
     *
     * @returns {boolean} Is Section active
     */
    isActive(): boolean;
    /**
     * Gets the active section type.
     */
    getActiveSectionType(): SectionType | undefined;
    /**
     * Gets the active section.
     */
    getActiveSection(): BaseSection | undefined;
    /**
     * Sets clipping object ids for all sections.
     * @param ids
     * @returns
     * @description Set the id of the object that needs to be clipping for all section
     */
    setClippingObjectIds(ids?: number[]): void;
    /**
     * Sets clipping object ids for a specific SectionType.
     * @param ids
     * @returns
     * @description Set the id of the object that needs to be clipping for section by section type
     */
    setClippingObjectIdsForType(type: SectionType, ids?: number[]): void;
    /**
     * Destroies this plugin.
     */
    destroy(): void;
}
