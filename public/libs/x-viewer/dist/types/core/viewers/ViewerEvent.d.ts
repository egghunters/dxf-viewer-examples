/**
 * Viewer events
 * TODO: dxf event and bim event
 */
export declare enum ViewerEvent {
    /**
     * Triggered when click viewer
     */
    MouseClick = "mouseclick",
    /**
     * Triggered when layout is changed.
     * It is specific for Viewer2d.
     */
    LayoutChange = "layoutchange",
    /**
     * @internal
     * TODO: Viewer3d need it too.
     * Triggered when a model is loaded.
     */
    ModelLoad = "modelload",
    /**
     * Triggered before rendered.
     */
    BeforeRender = "beforerender",
    /**
     * Triggered when rendered
     * @internal
     */
    AfterRender = "afterrender",
    /**
     * Triggered when animate() is executed.
     * @internal
     */
    OnAnimate = "onanimate",
    /**
     * Triggered when Viewered switch camera
     * @internal
     */
    CameraChange = "camerachange",
    /**
     * Triggered when control end
     * @internal
     */
    ControlChange = "controlchange",
    /**
     * Triggered when box select activated
     */
    BoxSelectActivate = "boxselectactivate",
    /**
     * Triggered when box select deactivated
     */
    BoxSelectDeactivate = "boxselectdeactivate",
    /**
     * Triggered when pick markup activated
     */
    PickMarkupActivate = "pickmarkupactivate",
    /**
     * Triggered when pick markup deactivated
     */
    PickMarkupDeactivate = "pickmarkupdeactivate",
    MarkupActivate = "markupactivate",
    /**
     * Triggered when markup feature is deactivated
     */
    MarkupDeactivate = "markupdeactivate",
    /**
     * Triggered when a markup is added
     */
    MarkupAdd = "markupadd",
    /**
     * Triggered when a markup is updated
     */
    MarkupUpdate = "markupupdate",
    /**
     * Triggered when a markup is removed
     */
    MarkupRemove = "markupremove",
    /**
     * Triggered before a markup is being removed
     */
    BeforeRemoveMarkup = "beforeremovemarkup",
    MeasurementActivate = "measurementactivate",
    MeasurementDeactivate = "measurementdeactivate",
    /**
     * Triggered when a measure is added
     */
    MeasurementAdd = "measurementadd",
    /**
     * Triggered when a measure is removed
     */
    MeasurementRemove = "measurementremove",
    /**
     * Triggered when click hotpoint
     */
    HotpointClick = "hotpointclick"
}
