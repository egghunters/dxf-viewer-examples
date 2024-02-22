import * as THREE from "three";
import type { DxfData } from "../../core/dxf";
import type { PdfData } from "../../core/viewers";
/**
 * Loaded 3d model info for Viewer3d.
 */
export interface ModelData3d {
    /**
     * modelId that is unique for loaded models
     */
    modelId: string;
    /**
     * Three.js object.
     */
    object?: THREE.Object3D;
    /**
     * Bounding box of the model.
     */
    bbox?: THREE.Box3;
    /**
     * Edge objects of the model.
     */
    edges?: THREE.LineSegments[];
    /**
     * TilesRenderer for BimTiles
     * @internal
     */
    tilesRenderer?: any;
}
/**
 * Loaded 2d model info for Viewer2d.
 */
export interface ModelData2d {
    /**
     * modelId that is unique for loaded models
     */
    modelId: string;
    /**
     * Used for dxf data.
     */
    dxfData?: DxfData;
    /**
     * Used for pdf data.
     */
    pdfData?: PdfData;
    /**
     * Model space transform matrix.
     * @internal
     */
    msTransformMatrix?: THREE.Matrix4;
}
/**
 * BimTile object.
 */
export interface TileObject {
    tilesetId: number;
    userId: number;
}
