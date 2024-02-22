export declare class CancelablePromise {
    promise: Promise<unknown>;
    private cancelReject?;
    constructor(promise: Promise<unknown>);
    cancel(): void;
}
