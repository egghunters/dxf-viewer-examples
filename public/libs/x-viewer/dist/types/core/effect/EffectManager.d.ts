import * as THREE from "three";
import { type BaseViewer } from "../viewers";
/**
 * Visual effect manager for viewers.
 */
export declare class EffectManager {
    private viewer;
    private composerEnabled;
    private composer?;
    private renderPass?;
    private effectFxaaPass?;
    private saoPass?;
    private ssaoPass?;
    private outlinePass?;
    private ssaaRenderPass?;
    private bloomPass?;
    private unrealBloomPass?;
    private vertexNormalsHelpers?;
    constructor(viewer: BaseViewer);
    get enabled(): boolean;
    set enabled(enable: boolean);
    get renderPassEnabled(): boolean;
    set renderPassEnabled(enable: boolean);
    get fxaaPassEnabled(): boolean;
    set fxaaPassEnabled(enable: boolean);
    get saoPassEnabled(): boolean;
    set saoPassEnabled(enable: boolean);
    get ssaoPassEnabled(): boolean;
    set ssaoPassEnabled(enable: boolean);
    get outlinePassEnabled(): boolean;
    set outlinePassEnabled(enable: boolean);
    get ssaaPassEnabled(): boolean;
    set ssaaPassEnabled(enable: boolean);
    get bloomPassEnabled(): boolean;
    set bloomPassEnabled(enable: boolean);
    get unrealBloomPassEnabled(): boolean;
    set unrealBloomPassEnabled(enable: boolean);
    setOutlinePassSelectObjects(objects: THREE.Object3D[]): void;
    enableModelEdges(enable: boolean): void;
    showVertexNormals(show: boolean, size?: number): void;
    render(): void;
    destroy(): void;
}
