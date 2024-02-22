/**
 * Gets the sdk version ran on this device from local storage.
 */
export declare const getVersionFromLocalStorage: () => string | null;
/**
 * Sets the sdk version to local storage.
 */
export declare const setVersionToLocalStorage: () => void;
/**
 * Checks if current sdk version and last version are different.
 * There can be storage data formant change if sdk version is updated,
 * we may simply clean up local storage in this case.
 */
export declare const checkIsNewVersion: () => boolean;
