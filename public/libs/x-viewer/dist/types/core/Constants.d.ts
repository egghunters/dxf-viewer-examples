/**
 * To improve performance, we can set object.matrixAutoUpdate = false for static or rarely moving objects and
 * manually call object.updateMatrix() whenever their position/rotation/quaternion/scale are updated.
 * Add a constrant here, so developer can change it here easily for debugging.
 * @internal
 */
export declare const MatrixAutoUpdate = false;
/**
 * These concept can be complex: hitable, snapable, selectable, visible
 * Mesh                            Y        Y         Y           Y
 * text in Viewer2d                Y        N         Y           Y
 * ground plan                     Y        Y         N           Y
 * outline                         N        Y         N           Y
 * OSnap auxiliary object          N        Y         N           N
 *
 * So, we must handle them properly. We'll try to put them into different layers.
 *
 * For each created object with geometry and material, the default layer is set to enableAll.
 * If the object is only displayed, it is not necessary to call enableAll. For example, some auxiliary display objects.
 * For objects that cannot be hitable, snapable, selectable, etc., call ObjectUtils.disableLayerChannels to exclude the corresponding channel.
 * @example
 * ``` typescript
 *   this.groundPlane.layers.enableAll();
 *   ObjectUtils.disableLayerChannels(this.groundPlane, [LayerForSelectableObjects]);
 * ```
 */
/**
 * @internal
 */
export declare const LayerForHitableObjects = 10;
/**
 * @internal
 */
export declare const LayerForSnapableObjects = 11;
/**
 * @internal
 */
export declare const LayerForSelectableObjects = 12;
/**
 * Object highlight color.
 */
export declare const HighlightColor = 583902;
/**
 * Object highlight color in rgba format.
 */
export declare const HighlightColorRgba: number[];
/**
 * Object outline color.
 */
export declare const OutlineColorRgba: number[];
/**
 * Default object opacity value.
 */
export declare const DefaultOpacity = 0.5;
/**
 * Default camera settings.
 */
export declare const DefaultCameraNear = 0.1;
export declare const DefaultCameraFar = 5000;
export declare const DefaultCameraFov = 45;
/**
 * Iconfont class name for toolbar, bottombar, section, etc..
 * @internal
 */
export declare const IconfontClass = "gemini-viewer-iconfont";
export declare const IconfontClass2 = "gemini-viewer-icon";
/**
 * @internal
 * Angle threshold at which two plane normals are parallel. Used to calculate edges.
 */
export declare const ThresholdAngleForEdge = 10;
