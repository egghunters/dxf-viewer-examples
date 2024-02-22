/**
 * Camera projection type.
 */
export declare enum CameraProjection {
    Perspective = "Perspective",
    Orthographic = "Orthographic"
}
/**
 * Camera config
 * @internal
 * @deprecated Use Viewpoint instead
 */
export interface CameraConfig {
    /**
     * The camera location
     */
    eye: THREE.Vector3;
    /**
     * The location that the camera looks to
     */
    look: THREE.Vector3;
    /**
     * @internal
     */
    up?: THREE.Vector3;
    /**
     * The camera zoom
     */
    zoom?: number;
    /**
     * The camera's near clip plane
     */
    near?: number;
    /**
     * The camera's far clip plane
     */
    far?: number;
}
/**
 * Model config
 */
export interface ModelConfig {
    /**
     * Unique id of the model
     */
    modelId?: string;
    /**
     * Model name
     */
    name?: string;
    /**
     * Source url of the model
     */
    src: string;
    /**
     * Used to distinguish format, because it may be hard to know the format by src!
     * @internal
     */
    fileFormat?: string;
    /**
     * File encoding, can be used by dxf. Common encoding include "UTF-8", "gb2312", etc.
     * @internal
     */
    encoding?: string;
    /**
     * A float array of length 16, definds model's position, rotation and scale
     */
    matrix?: number[];
    /**
     * If we want to merge meshes/lines/points with the same material
     * @internal
     * @default false
     */
    merge?: boolean;
    /**
     * If we want to generate and show edges/outlines to the modle.
     * It is useful for Viewer3d.
     * @internal
     */
    edges?: boolean;
    /**
     * If this model is visible by default.
     * @internal
     */
    visible?: boolean;
}
/**
 * 2d model config
 */
export interface Model2dConfig extends ModelConfig {
    /**
     * If to ignore anything of paper space.
     * There are some scenarios to ignore paper space by default, includes:
     * - Dxf overlay, aka, loading more than one dxf files into a viewer. We'll only load model space for the first file.
     * - Dxf compare. Since we'll only compare model space, it won't load paper space at all.
     *
     * This option is useful when user want to explicitly ignore paper space.
     * @default false
     */
    ignorePaperSpace?: boolean;
    /**
     * Applies this color to everything in this model.
     * This allows user to show a drawing with a pure color (black, white, etc.).
     * Color value is between 0 and 1, e.g., [1, 0, 0] means 'red'.
     */
    overrideColor?: number[];
}
/**
 * Common viewer config
 */
export interface BaseViewerConfig {
    /**
     * @description canvas id to contain the viewer.
     */
    containerId: string;
    /**
     * @internal
     */
    language?: "cn" | "en";
    /**
     * @internal
     */
    logLevel?: "debug" | "info" | "warn" | "error" | "silent";
    /**
     * @internal
     */
    enableSpinner?: boolean;
    /**
     * @internal
     */
    enableProgressBar?: boolean;
    /**
     * @description just for react native
     * @internal
     */
    context?: WebGLRenderingContext | WebGL2RenderingContext;
    /**
     * @description just for react native
     * @internal
     */
    context2d?: CanvasRenderingContext2D;
}
/**
 * This wrappers most config for Viewer3d
 */
export interface Viewer3dConfig extends BaseViewerConfig {
    /**
     * Default is `meters`
     * @internal
     */
    units?: string;
    /**
     * Sets the default locale
     * @internal
     */
    locale?: "cn" | "en";
}
/**
 * This wrappers most config for Viewer2d
 */
export interface Viewer2dConfig extends BaseViewerConfig {
    /**
     * Enables layout bar so we can switch to other layouts.
     * The default layout bar is an example UI of the viewer, since plenty of APIs are exposed,
     * you are recommended to create your own layout bar with customized style, location, etc.
     */
    enableLayoutBar?: boolean;
    /**
     * If to cache model into indexeddb (or maybe local storage in future).
     * If enabled, it will get model data from cache the next time model is loaded.
     * @internal
     * @default true
     */
    enableLocalCache?: boolean;
}
/**
 * Dxf compare config.
 */
export interface DxfCompareConfig {
    /**
     * Enables to compare properties (color, linetype, line width, etc.)
     */
    enableDetailComparision: boolean;
}
/**
 * A default Viewer3dConfig as a template, which enables most plugins.
 * @internal
 */
export declare const DefaultViewer3dConfig: Viewer3dConfig;
/**
 * @internal
 */
export interface IsolateObjectsParam {
    id: string;
    modelId: string;
}
/**
 * @internal
 */
export interface IsolateObjectsParams {
    familyInstanceIds: IsolateObjectsParam[];
}
/**
 * @internal
 */
export interface ScreenshotConfig {
    type: string;
    quality: number;
    includeOverlay: boolean;
}
/**
 * Viewpoint definition.
 */
export interface Viewpoint {
    /**
     * The camera location
     */
    eye: THREE.Vector3;
    /**
     * The location that the camera looks to
     */
    look: THREE.Vector3;
    /**
     * @internal
     */
    up?: THREE.Vector3;
    /**
     * The camera zoom, used by Orthographic camera.
     */
    zoom?: number;
}
/**
 * Icon class.
 * Used by toolbar and bottom bar icons, etc.
 */
export interface IconClass {
    /**
     * The default icon.
     */
    default: string;
    /**
     * The icon when item is actived.
     */
    active?: string;
    /**
     * The icon font class name.
     */
    iconFont?: string;
}
