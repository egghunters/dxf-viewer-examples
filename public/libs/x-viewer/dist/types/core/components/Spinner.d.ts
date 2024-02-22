import type { Container } from "./Container";
/**
 * Build in Spinner, used to indicate the progress is busy.
 */
export declare class Spinner {
    private element;
    private jobCount;
    constructor(container: Container);
    /**
     * Sets spinner visibility
     */
    private setSpinnerVisibility;
    increaseJobCount(): void;
    decreaseJobCount(): void;
    destroy(): void;
}
