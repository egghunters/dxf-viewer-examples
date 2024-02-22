export declare class Container {
    width: number;
    height: number;
    /**
     * The root container which will be created to under the container user passed in,
     * it typically contains a viewer container and a widget container.
     */
    container: HTMLDivElement;
    /**
     * The viewer container, which contains
     * - canvas of three.js
     * - canvas for overlay renderer
     * - css2d object renderer
     */
    viewerContainer?: HTMLDivElement;
    /**
     * The vidget container, may contain:
     * - Axis gizmo
     * - Progress bar
     * - Toolbar ui
     * - Context menu
     */
    widgetContainer?: HTMLDivElement;
    constructor(containerId: string);
    /**
     * Creates a viewerContainer under the container that user passed in.
     * There are some benefits to create a new one. e.g., its style won't affect
     * the container div user passed in.
     */
    private initViewerContainer;
    /**
     *
     * @description Create a div for ui widget, if widget need position, just relative container, maybe remove later.
     */
    private initWidgetContainer;
    get needResize(): boolean;
    destroy(): void;
}
