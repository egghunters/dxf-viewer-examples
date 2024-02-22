/**
 * ThreeJS' raycaster calculates all intersections, thus has a worse performance,
 * here we add a flag to reduce the number of intersections to improve performance.
 * @internal
 */
export declare const MaxRaycastIntersectionCount = 1;
