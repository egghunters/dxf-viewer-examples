/**
 * Copied and ported to code standard as the b-spline library is not maintained any longer.
 * Source:
 * https://github.com/thibauts/b-spline
 * Copyright (c) 2015 Thibaut Séguy <thibaut.seguy@gmail.com>
 */
export declare const bspline: (t: number, degree: number, points: number[][], knots: number[], weights?: number[]) => number[];
