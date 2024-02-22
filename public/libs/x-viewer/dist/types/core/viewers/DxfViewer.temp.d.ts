import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Model2dConfig, Viewer2dConfig } from "../../core/Configs";
import { Box2, Vector2 } from "../../core/Constants";
import { Drawable, DrawableData } from "../../core/canvas";
import { DxfLayer } from "../../core/dxf";
import { ILayoutObject } from "../../core/dxf-parser";
import { FontManager } from "../../core/font";
import { EventInfo } from "../../core/input-manager/InputManager";
import { MarkupPlugin, MarkupType } from "../../plugins/markups";
import { Model2d, ModelData2d } from "../../core/model";
import { BaseViewer } from "../../core/viewers/BaseViewer";
import { MeasurementData, MeasurementType } from "../../plugins/measurements";
import type { MeasurementPlugin } from "../../plugins/measurements";
/**
 * Markup for Viewer2d contains additional information, e.g. layoutName.
 *
 * Viewer2d doesn't maintain the relationship between model and markup data,
 * business logic should knows which model a set of markup data belong to.
 */
export type MarkupData = DrawableData;
export interface EntityData {
    modelId: string;
    layerName: string;
}
/**
 * A group of dxf/dwg layers for a drawing.
 */
export interface DxfLayers {
    modelId: string;
    layers: Record<string, DxfLayer>;
}
export interface PdfLayers {
    modelId: string;
    layers: Record<string, PdfLayer>;
}
export interface PdfLayer {
    name: string;
    id: string;
    index: string;
    visible: boolean;
}
export interface PdfData {
    threejsObject: THREE.Object3D;
    layers: Record<string, PdfLayer>;
    layersAndThreejsObjects?: Record<string, THREE.Object3D[]>;
    loadedEntityCount: number;
}
/**
 * Threejs objects are organized in tree view as below:
 *
 * - modelLevelObject1              (THREE.Group, name = <modelId>)
 *     - layoutLevelObject1         (THREE.Group, name = <layout name>, used to control layout visibility)
 *         - entityLevelObject1     (THREE.Point/Line/Mesh/Group)
 *
 * - Layer threejs objects
 * {
 *    layerName:[threejsObject1,threejsObject2,threejsObject3,...] (THREE.Point/Line/Mesh)
 * }
 */
/**
 * "dwg" is short for "drawing", it is a file format saved by AutoCAD.
 * And "dxf" is data exchange format, which can be converted from a dwg file.
 * We cannot read dwg directly, and need to convert it to dxf first via ODA.
 *
 * Supported dxf version: AutoCAD 2018. Both binary and ascii are supported.
 *
 * Json Encoding: UTF-8 encoding without BOM
 *
 * Coordinate system: right-handed, y-up
 *
 * About units:
 * - The unit of distance follows the master dxf file's unit
 * - The unit of area follows the master dxf file's unit
 * - The unit of angle is "degree", counterclockwise
 * - The unit of time is "second"
 *
 * Color: use rgb/rgba, values between 0-1
 *
 * About Measurement in Viewer2d:
 * - A measurement is generated by Viewer2d.
 * - Measurements data should be stored by users, so users can restore measurements data into Viewer2d later.
 * - Viewer2d manages measurements data, it can be created, removed, hidden, etc.
 * - Viewer2d doesn't maintain the relationship between measurement and layout.
 *
 * About Markup in Viewer2d:
 * Markup is pretty similar to measurement.
 *
 * About Hotpoint in Viewer2d:
 * - A hotpoint is created and stored by user.
 * - A hotpoint can be added to, and removed from Viewer2d.
 * - Caller should set a hotpointId that is unique in the session of current Viewer2d.
 * - Viewer2d doesn't hide a hotpoint, user is able to do it.
 * - Viewer2d doesn't maintain the relationship between hotpoint and layout.
 *
 * About layouts
 * - Each layout has its own home view.
 * - When switching to another layout, it clears all measurements, markups and hotpoints.
 * - When switching to another layout, it deactivates any in-progress operation like measurement, markup, etc.
 *
 * About overlay
 * - It supports to add as many models as user want, as long as the browser has sufficient memory, cpu/gpu, etc.
 * - The first model is called "master" model, others are called "overlay" models.
 * - It ignores an overlay model's paper space.
 * - An overlay model's unit should be converted to master model's unit if they are not the same.
 * - We'll append modelId as prefix for getLayers()
 *
 * About comparision
 * - It compares just "Model" spaces.
 * - It compares entities with the same handles and types.
 * - It compares entities' geometries, positions, scales, etc.
 * - It ignores a layer's visibility, freeze settings.
 * - It ignores an entity's properties, like linetype, line width, fill pattern, font, color, etc.
 * - It ignores spatial filters (xclip) of block references.
 * - It ignores layer relative operations, like moving an entity to another layer, changing a layer color, etc.
 * - By default, an "Added" entity is rendered in green, a "Removed" entity is in red, a "Modified" entity is composed by two parts, one "Removed" and another "Added".
 *
 * About undo/redo
 * - It supports undo/redo for measurement and markup operations. E.g., creating/deleting/moving a markup.
 * - Setting/removing a batch of measurements or markups will be taken as one operation.
 * - Switching to another layout clears all undo/redo history.
 *
 * About OSnap
 * - It supports snapping to the end points and middle point of a line.
 * - It supports snapping to the intersection point of two lines.
 * - It supports snapping to the foot of perpendicular against a line.
 * - It supports snapping to any point along a line.
 *
 * @example
 * ``` typescript
 * const viewerCfg = {
 *     containerId: "myCanvas",
 *     enableSpinner: true,
 *     enableLayoutBar: true,
 * };
 * const modelCfg = {
 *     modelId: "id_0",
 *     name: "sample",
 *     src: "http://www.abc.com/sample.dxf",
 * }
 * const fontFiles = ["http://www.abc.com/hztxt.shx", "http://www.abc.com/simplex.shx"];
 *
 * const viewer = new Viewer2d(viewerCfg);
 * await viewer.setFont(fontFiles);
 * await viewer.loadModel(modelCfg);
 * ```
 */
export declare class Viewer2d extends BaseViewer {
    /**
     * @internal
     */
    name: any;
    private readonly CAMERA_Z_POSITION;
    private readonly CAMERA_MIN_ZOOM;
    private timer;
    protected css2dRenderer?: CSS2DRenderer;
    protected fontManager?: FontManager;
    protected enableSelection?: boolean;
    protected selectedObject?: THREE.Object3D | Drawable;
    /**
     * The record "key" is modelId or src.
     * @internal
     */
    loadedModels: Model2d[];
    /**
     * @internal
     */
    masterModelId: string;
    private dxfLayoutBar?;
    private loadingManager?;
    private raycaster?;
    private cameraUpdateInterval?;
    protected selected: boolean;
    private markupManager?;
    private zoomToRectHelper?;
    private raf?;
    private clock;
    protected renderEnabled: boolean;
    private timeoutSymbol?;
    private enableHideVisuallySmallObjects;
    private sortedHidableObjects;
    private lastCameraZoom;
    private lastFrame;
    private activeLayoutName;
    private layoutInfos;
    private units;
    private raycastableObjects;
    private fpsUtils;
    constructor(viewerCfg: Viewer2dConfig);
    /**
     * Initialize everything it needs
     * @internal
     */
    protected init(): void;
    private initInputManager;
    private initThree;
    private initDom;
    private initScene;
    private initRenderer;
    protected initCSS2DRenderer(): void;
    private initCamera;
    /**
     * @internal
     */
    protected initControls(): void;
    private onResize;
    protected onControlsChange(viewer: Viewer2d): () => void;
    /**
     * Initialize mouse/pointer events
     */
    private initEvents;
    protected initOthers(): void;
    private initLoadingProgressBar;
    /**
     * Shows the layout bar
     * @internal
     */
    showLayoutBar(): void;
    /**
     * Hides the layout bar
     * @internal
     */
    hideLayoutBar(): void;
    protected animate(): void;
    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - Anything added to, removed from scene, or objects' position, scale, rotation, opacity, material, etc. changed
     *  - Anything selected/unselected
     *  - Camera changed
     *  - Render area resized
     * @internal
     */
    enableRender: (time?: number) => void;
    /**
     * Gets current FPS value
     * @internal
     */
    getFps(): number;
    /**
     * @internal
     */
    is3d(): boolean;
    /**
     * @description {en} Destroys Viewer2d.
     * @description {zh} 销毁 Viewer2d。
     * @example
     * ```typescript
     * viewer.destroy();
     * ```
     */
    destroy(): void;
    /**
     * Used to indicate how many dxf is loading
     */
    private loadingDxfCount;
    /**
     * @description {en} Loads a dxf file.
     * The first loaded file will be taken as a "master" model.
     * Any other files are non-master, we call "overlay" model.
     * We'll load everything of a master model, including model and paper space.
     * For an overlay model, we'll only load its model space. And its model space can only
     * overly to master model's model space.
     * @description {zh} 加载 dxf 文件。
     * 第一个加载的文件将被视为“主”模型。
     * 任何其他文件都是非主文件，我们称之为“叠加”模型。
     * 我们将加载主模型的所有内容，包括模型和图纸空间。
     * 对于叠加模型，我们只会加载其模型空间。并且它的模型空间只能叠加到主模型的模型空间上。
     * @param modelCfg
     * - {en} The configuration of the model to be loaded.
     * - {zh} 要加载的模型的配置。
     * @param onProgress
     * - {en} A callback function to indicate the loading progress.
     * - {zh} 用于指示加载进度的回调函数。
     * @example
     * ``` typescript
     * const viewerCfg = {
     *     containerId: "myCanvas",
     * };
     * const modelCfg = {
     *     modelId: "id_0",
     *     name: "dxf 0",
     *     src: "http://www.abc.com/sample.dxf",
     * }
     * const viewer = new Viewer2d(viewerCfg);
     * await viewer.loadModel(modelCfg, (event) => {
     *     const progress = (event.loaded * 100) / event.total;
     *     console.log(`Loading progress: ${progress}%`);
     * });
     * console.log("Loaded");
     * ```
     */
    loadModel(modelCfg: Model2dConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Unloads a dxf
     * @internal
     */
    unloadDxf(): void;
    /**
     *
     * @param model
     * @returns
     * @description Add model data to viewer.
     */
    addModel(modelData: ModelData2d): Model2d | undefined;
    /**
     * Gets loaded entity count
     * @internal
     * @returns {number}
     */
    getEntitiesCount(): number;
    /**
     * Gets loaded dxf model id array
     */
    protected getLoadedDxfModelIds(): string[];
    /**
     * @description {en} Gets layout names of the master model.
     * @description {zh} 获取主模型的布局名称。
     * @returns
     * - {en} Layout names of the master model.
     * - {zh} 主模型的布局名称。
     * @example
     * ```typescript
     * const layoutNames = dxfViewer.getLayoutNames();
     * console.log(layoutNames); // ['Model', 'Layout1', 'Layout2']
     * ```
     */
    getLayoutNames(): string[];
    /**
     * Gets layouts.
     * Only returns master model's layouts.
     */
    protected getLayouts(): ILayoutObject[];
    private handleOverlayDxf;
    /**
     * @description {en} Activates a layout.
     * @description {zh} 激活布局。
     * @param layoutName
     * - {en} The name of the layout to be activated.
     * - {zh} 要激活的布局名称。
     * @example
     * ```typescript
     * viewer.activateLayout('Layout1');
     * ```
     */
    activateLayout(layoutName: string): void;
    private cancelAllOperations;
    /**
     * @description {en} Gets active layout.
     * @description {zh} 获取当前布局。
     * @returns
     * - {en} Active layout name or undefined.
     * - {zh} 当前激活的布局名称或undefined。
     * @example
     * ``` typescript
     * const activeLayout = viewer.getActiveLayoutName();
     * console.log(activeLayout);
     * ```
     */
    getActiveLayoutName(): string | undefined;
    /**
     * @description {en} Gets dxf layers.
     * @description {zh} 获取dxf图层。
     * @returns
     * - {en} Dxf layers.
     * - {zh} dxf图层。
     * @example
     * ``` typescript
     * const dxfLayers = viewer.getLayers();
     * for (let i = 0; i < dxfLayers.length; ++i) {
     *     const layers = dxfLayers[i].layers;
     *     const layerNames = Object.keys(layers).sort();
     *     console.log(layerNames);
     * }
     * ```
     */
    getLayers(): (DxfLayers | PdfLayers)[];
    /**
     * Sets model's (aka, a dxf file) visibility.
     * @throws Throws exception if modelId doesn't exist.
     * @internal
     */
    setModelVisibility(modelId: string, visible: boolean): void;
    /**
     * @description {en} Sets layer's visibility.
     * @description {zh} 设置图层的可见性。
     * @param layerName
     * - {en} Layer's name to show or hide.
     * - {zh} 要显示或隐藏的图层名称。
     * @param visible
     * - {en} Layer's target visibility.
     * - {zh} 图层的目标可见性。
     * @param modelId
     * - {en} Useful when more than one model is loaded, if not specified, will use the master model.
     * - {zh} 当加载了多个模型时有用，如果未指定，将使用主模型。
     * @throws Error
     * - {en}: Throws exception if given modelId doesn't exist.
     * - {zh} 如果给定的modelId不存在，则抛出异常。
     * @example
     * ``` typescript
     * // Hides layer "0"
     * viewer.setLayerVisibility("0", false);
     * ```
     */
    setLayerVisibility(layerName: string, visible: boolean, modelId?: string): void;
    /**
     * Sets layer's opacity
     * @internal
     */
    setLayerOpacity(layerName: string, opacity: number, modelId?: string): void;
    /**
     * Sets layer's color
     * @throws Throws exception if layer doesn't exist.
     * @internal
     */
    setLayerColor(layerName: string, color: number, modelId?: string): void;
    /**
     * Resets a layer's color.
     * @internal
     */
    resetLayerColor(layerName: string, modelId?: string): void;
    /**
     * @description {en} Sets font.
     * This needs to be called before loading a dxf, it won't affect any loaded text.
     * It accepts shx or typeface formats. For typeface, it only support passing in 1 font file in the array for now.
     * @description {zh} 设置字体。
     * 需要在加载dxf之前调用，不会影响已加载的文字。
     * 支持shx或typeface格式。对于typeface，目前只支持传入1个字体文件。
     * @param urls
     * - {en} font file urls.
     * - {zh} 字体文件链接。
     * @example
     * ```typescript
     * viewer.setFont(["https://example.com/xxx.shx"]);
     * ```
     */
    setFont(urls: string[]): Promise<void>;
    getFont(): FontManager | undefined;
    /**
     * Sets loading manager.
     * @internal
     * This needs to be called before loading a dxf, used to load local external links.
     * @param manager
     */
    setLoadingManager(manager: THREE.LoadingManager): void;
    /**
     * Sets display length units.
     * @internal Not implemented yet!
     * @default Millimeters
     */
    setDisplayLengthUnits(): void;
    /**
     * Sets display area units
     * @internal Not implemented yet!
     * @default Meters
     */
    setDisplayAreaUnits(): void;
    /**
     * Sets display decimal digits
     * @internal Not implemented yet!
     * @default 2
     */
    setDisplayPrecision(): void;
    /**
     * @description {en} Gets current view extent.
     * This is useful for user to save this value as a viewpoint, and jump to this viewpoint next time.
     * @description {zh} 获取当前视图范围。
     * 用户可使用该接口获取当前视口范围，并在适当的场景下跳转到该视口范围。
     * @example
     * ``` typescript
     * const box = viewer.getCurrentViewExtent();
     * console.log("Current view extent:", box);
     * ```
     */
    getCurrentViewExtent(): Box2;
    /**
     * @description Compatible with older versions, use MeasurePlugin instead
     * @internal
     * @deprecated use MeasurePlugin instead
     */
    get measurePlugin(): MeasurementPlugin | undefined;
    /**
     * @description {en} Activates one of "Distance", "Area" or "Angle" measurement
     * @description {zh} 激活"距离", "面积" 或者 "角度"测量
     * @param type
     * - "Distance", "Area" or "Angle"
     * @example
     * ``` typescript
     * viewer.activateMeasurement(MeasurementType.Distance);
     * ```
     * @deprecated use MeasurePlugin instead
     */
    activateMeasurement(type: MeasurementType): void;
    /**
     * @description {en} Deactivates measurement.
     * @description {zh} 退出测量。
     * @example
     * ``` typescript
     * viewer.deactivateMeasurement();
     * ```
     * @deprecated use MeasurePlugin instead
     */
    deactivateMeasurement(): void;
    /**
     * @description {en} Gets active measurement type.
     * @description {zh} 获取当前激活的测量类型。
     * @returns
     * - "Distance", "Area" or "Angle" or undefined
     * @example
     * ``` typescript
     * const measurementType = viewer.getActiveMeasurementType();
     * console.log(measurementType);
     * ```
     * @deprecated use MeasurePlugin instead
     */
    getActiveMeasurementType(): MeasurementType | undefined;
    /**
     * @description {en} Gets all measurements.
     * @description {zh} 获取所有测量数据。
     * @returns
     * - {en} measurement data array.
     * - {zh} 测量数据数组。
     * @example
     * ``` typescript
     * const measurementData = viewer.getMeasurements();
     * console.log(measurementData);
     * ```
     * @deprecated use MeasurePlugin instead
     */
    getMeasurements(): MeasurementData[];
    /**
     * @description {en} Cancels current measurement. This won't deactivate measurement, rather, you can start a new measurement.
     * @description {zh} 取消当前的测量绘制。这并不会退出测量，用户可以开始一个新的测量。
     * @deprecated use MeasurePlugin instead
     */
    cancelMeasurement(): void;
    /**
     * @description {en} Sets measurement data.
     * @description {zh} 设置测量数据。
     * @param measurementData
     * - {en} measurement data array.
     * - {zh} 测量数据数组。
     * @example
     * ``` typescript
     * const measurementData = [{
     *     type: "Distance",
     *     id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *     points: [[0, 1000], [5000, 1000]],
     * }];
     * viewer.setMeasurements(measurementData);
     * ```
     * @deprecated use MeasurePlugin instead
     */
    setMeasurements(measurementData: MeasurementData[]): void;
    /**
     * Selects a measurement by id
     * @internal
     * @deprecated use MeasurePlugin instead
     */
    selectMeasurement(id: string): void;
    /**
     * Unselects a measurement.
     * @internal
     * @deprecated use MeasurePlugin instead
     */
    unselectMeasurement(): void;
    /**
     * @description {en} Removes a measurement by id.
     * @description {zh} 根据id删除测量数据。
     * @param id
     * - {en} Measurement data id.
     * - {zh} 测量数据id。
     * @example
     * ``` typescript
     * const id = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * viewer.removeMeasurement(id);
     * ```
     * @deprecated use MeasurePlugin instead
     */
    removeMeasurement(id: string): void;
    /**
     * Sets a measurement's visibility.
     * Note that, the markup should belong to active layout. You shouldn't update a markup of an inactive layout.
     * @internal
     * @deprecated use MeasurePlugin instead
     */
    setMeasurementVisibility(id: string, visible: boolean): boolean;
    /**
     * @description {en} Clears measurement results.
     * @description {zh} 清除测量结果。
     * @example
     * ``` typescript
     * viewer.clearMeasurements();
     * ```
     * @deprecated use MeasurePlugin instead
     */
    clearMeasurements(): void;
    /** markup start **/
    /**
     * @internal
     */
    getMarkupManager(): MarkupPlugin | undefined;
    /**
     * @description {en} Activates markup feature.
     * @description {zh} 激活标注功能。
     * @param type
     * - {en} markup type.
     * - {zh} 标注类型。
     * @example
     * ``` typescript
     * const markupType = MarkupType.Arrow;
     * viewer.activateMarkup(markupType);
     * ```
     * @deprecated
     */
    activateMarkup(type: MarkupType): void;
    /**
     * @description {en} Deactivates markup feature.
     * @description {zh} 退出标注功能。
     * @example
     * ``` typescript
     * viewer.deactivateMarkup();
     * ```
     */
    deactivateMarkup(): void;
    /**
     * @description {en} Gets active markup type.
     * @description {zh} 获取激活的标注类型。
     * @returns
     * - {en} markup type.
     * - {zh} 标注类型。
     * @example
     * ``` typescript
     * const markupType = viewer.getActiveMarkupType();
     * console.log(markupType);
     * ```
     */
    getActiveMarkupType(): MarkupType | undefined;
    /**
     * Set markup stroke color
     * @internal
     */
    setMarkupLineColor(r: number, g: number, b: number, a: number): void;
    /**
     * @internal
     */
    getMarkupLineColor(): number[] | undefined;
    /**
     * Set markup fill color
     * @internal
     */
    setMarkupFillColor(r: number, g: number, b: number, a: number): void;
    /**
     * @internal
     */
    getMarkupFillColor(): number[] | undefined;
    /**
     * Set markup stroke line width
     * @internal
     */
    setMarkupLineWidth(lineWidth: number): void;
    /**
     * @internal
     */
    getMarkupLineWidth(): number | undefined;
    /**
     * Set markup font size
     * @internal
     */
    setMarkupFontSize(fontSize: number): void;
    /**
     * @internal
     */
    getMarkupFontSize(): number | undefined;
    /**
     * @description {en} Gets all markups.
     * @description {zh} 获取所有标注数据。
     * @returns
     * - {en} markup data array.
     * - {zh} 标注数据数组。
     * @example
     * ``` typescript
     * const markupData = viewer.getMarkups();
     * console.log(markupData);
     * ```
     */
    getMarkups(): MarkupData[];
    /**
     * @description {en} Adds markups to active layout.
     * @description {zh} 添加标注到当前布局。
     * @param markupDataArray
     * - {en} markup data array.
     * - {zh} 标注数据数组。
     * @example
     * ``` typescript
     * const markupData = [{
     *     type: "ArrowMarkup",
     *     id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *     lineWidth: 2,
     *     strokeStyle: "#ff0000",
     *     fillStyle: "#ff000030",
     *     points: [[0, 0], [1000, 1000]],
     * }];
     * viewer.setMarkups(markupData);
     * ```
     */
    setMarkups(markupDataArray: MarkupData[]): void;
    /**
     * Sets a markup's visibility by id.
     * Note that, the markup should belong to active layout. You shouldn't update a markup of an inactive layout.
     * @internal
     */
    setMarkupVisibility(id: string, visible: boolean): boolean;
    /**
     * @description {en} Updates a markup.
     * @description {zh} 更新标注。
     * @param {MarkupData} markup
     * - {en} markup data.
     * - {zh} 标注数据。
     * @returns
     * - {en} Whether update successfully, true means success, false means failure.
     * - {zh} 是否更新成功，true表示成功，false表示失败。
     * @example
     * ``` typescript
     * const markupData = {
     *    type: "ArrowMarkup",
     *    id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *    lineWidth: 3,
     *    strokeStyle: "#ff0000",
     *    fillStyle: "#ff000030",
     *    points: [[0, 0], [1000, 1000]],
     * };
     * viewer.updateMarkup(markupData);
     */
    updateMarkup(markup: MarkupData): boolean;
    /**
     * @description {en} Removes a markup by markup id.
     * @description {zh} 根据标注id删除标注。
     * @param {string} id
     * - {en} markup id.
     * - {zh} 标注id。
     * @returns
     * - {en} Whether remove successfully, true means success, false means failure.
     * - {zh} 是否删除成功，true表示成功，false表示失败。
     * @example
     * ``` typescript
     * const markupId = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * viewer.removeMarkup(markupId);
     * ```
     */
    removeMarkup(id: string): boolean;
    /**
     * @description {en} Clears markups.
     * @description {zh} 清除所有标注。
     * @example
     * ``` typescript
     * viewer.clearMarkups();
     * ```
     */
    clearMarkups(): void;
    /** markup end **/
    /**
     * Gets mouse hit result in world coordinate
     * @example
     * ``` typescript
     * document.addEventListener("click", (event) => {
     *     const result = viewer.getHitResult(event);
     *     const loc = result?.location;
     *     if (loc) {
     *         console.log(`Clicked at x: ${loc[0]}, y: ${loc[1]}`);
     *     }
     * });
     * ```
     * @internal
     */
    getHitResult(event: MouseEvent | PointerEvent | EventInfo): Vector2 | undefined;
    /**
     * Gets hit result by Normalized Device Coordinates.
     * Lower left coordinate: (-1, -1)
     * Upper right coordinate: (1, 1)
     */
    protected getHitResultByNdcCoordinate(coord: Vector2): Vector2 | undefined;
    private getLayoutByName;
    private getActiveLayoutInfo;
    private getMsTransformMatrix;
    private getLayoutExtentEx;
    /**
     * Shows objects for given layout, and hide any other layouts.
     */
    private showLayoutObjects;
    private getLayoutViewports;
    private setMaterialUniforms;
    /**
     * Checks if a layer is frozen for viewport (VP Freeze)
     */
    private isLayerFrozenForViewport;
    private getFilteredViewports;
    private generateObjectsByViewport;
    private findSpatialFilter;
    private getAnyMaterial;
    private addSpatialFilterSection;
    private getObjectsByBoundingBox;
    private getDxfUnits;
    private generateSectionsBySpatialFilter;
    /**
     * @description {en} resize viewer
     * @description {zh} 重置视图大小
     * @param {number} width
     * - {en} width of viewer
     * - {zh} 视图宽度。
     * @param {number} height
     * - {en} height of viewer
     * - {zh} 视图高度。
     * @example
     * ```typescript
     * const width = 800;
     * const height = 600;
     * viewer.resize(width, height);
     * ```
     */
    protected resize(width: number, height: number): void;
    /**
     * @internal
     */
    getRaycaster(): THREE.Raycaster | undefined;
    /**
     * Gets the corresponding viewport by judging that the point is in the viewport
     */
    private getViewportByPoint;
    /**
     * Gets raycast-able objects by mouseEvent.
     * @internal
     */
    getRaycastableObjectsByMouse(event?: EventInfo): THREE.Object3D<THREE.Object3DEventMap>[];
    /**
     * Gets intersections by given mouse location.
     * If no MouseEvent is passed in, use (0, 0) as the raycaster's origin.
     */
    private getIntersections;
    /**
     * Handles mouse click event
     */
    private handleMouseClick;
    private selectDrawableByEvent;
    /**
     * Select or unselect an object.
     * depthTest is turned off by default. The highlighting is more pronounced when objects cover each other.
     */
    protected selectObject(object?: THREE.Object3D, depthTest?: boolean): void;
    /**
     * Clears the current selection
     * @internal
     */
    clearSelection(): void;
    /**
     * Makes camera fly to objects
     */
    protected flyToObjects(objects: THREE.Object3D[]): void;
    /**
     * Make camera fly to an object
     */
    protected flyToObject(object: THREE.Object3D): void;
    /**
     * Flies to current selected object if any
     */
    protected flyToSelectedObject(): void;
    /**
     * Flies to a random object (by alt + r).
     * It is useful when either the data is wrong or there is bug in program,
     * then we cannot see anything in the scene!
     */
    protected flyToRandomObject(): void;
    /**
     * Makes camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     * @param targetCameraZoom camera's target zoom value
     * @internal
     */
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3, targetCameraZoom?: number, animate?: boolean): void;
    /**
     * Moves camera to target position
     * @param position 2d position
     * @internal
     */
    goTo(position: Vector2, targetCameraZoom?: number, animate?: boolean): void;
    /**
     * @description {en} Moves camera to home view.
     * @description {zh} 移动相机到主视图.
     * @example
     * ``` typescript
     * viewer.goToHomeView();
     * ```
     */
    goToHomeView(): void;
    /**
     * @description {en} Zooms to specific bounding box.
     * @description {zh} 缩放到指定的包围盒.
     * @param bbox
     * - {en} 2d bounding box
     * - {zh} 2d 包围盒。
     * @example
     * ``` typescript
     * const box = { min: { x: 0, y: 0 }, max: { x: 10000, y: 10000} };
     * viewer.zoomToBBox(box);
     * ```
     */
    zoomToBBox(bbox: Box2): void;
    /**
     * @description {en} Zooms to view extent.
     * @description {zh} 缩放到视图范围.
     * @example
     * ``` typescript
     * viewer.zoomToExtent();
     * ```
     */
    zoomToExtent(): void;
    /**
     * @description {en} Sets background color.
     * @description {zh} 设置背景颜色。
     * @param r
     * - {en} Red channel value between 0 and 1.
     * - {zh} 红色通道值，介于 0 和 1 之间。
     * @param g
     * - {en} Green channel value between 0 and 1.
     * - {zh} 绿色通道值，介于 0 和 1 之间。
     * @param b
     * - {en} Blue channel value between 0 and 1.
     * -{zh} 蓝色通道值，介于 0 和 1 之间。
     * @example
     * ``` typescript
     * // {en} Sets background to gray
     * // {zh} 设置背景为灰色
     * viewer.setBackgroundColor(0.5, 0.5, 0.5);
     * ```
     */
    setBackgroundColor(r: number, g: number, b: number): void;
    /**
     * Gets LayoutInfo by layoutName. It creats LayoutInfo if doesn't exist.
     */
    private getLayoutInfo;
    /**
     * Creates a ground plane which is much bigger than bbox.
     */
    private updateGroundPlane;
    /**
     * Compute bounding box of loaded models for active layout
     * @internal
     */
    computeBoundingBox(): THREE.Box3;
    /**
     * Checks if an expected zoom value is valid, and adjust its value if necessary.
     */
    private checkAndGetLimitedCameraZoom;
    private getVisiblePixelSize;
    private setLayoutHidableObjectArray;
    private statObjects;
    /**
     * Updates hidable objects' visibility once camera.zoom changed.
     */
    private updateHidableObjectsVisibility;
    /**
     * Updates raycaster threshold to a proper value, so user can easily pick points and lines
     */
    private updateRaycasterThreshold;
    /**
     * Updates camera zoom value for shader materials, which are created in DxfLoader
     */
    private updateCameraZoomUniform;
}
