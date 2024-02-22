/**
 * Units are defined the same order as to Dxf format
 */
export declare enum Units {
    Unitless = "Unitless",
    Inches = "Inches",
    Feet = "Feet",
    Millimeters = "Millimeters",
    Centimeters = "Centimeters",
    Meters = "Meters"
}
/**
 * Gets the unit scale when converting to meter.
 */
export declare const UnitScaleToMeter: (src: Units) => number;
export declare const UnitScaleConversion: (src: Units, dest: Units) => number;
