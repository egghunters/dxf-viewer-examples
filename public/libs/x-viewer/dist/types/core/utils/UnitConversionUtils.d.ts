/**
 * @internal
 */
export declare const UnitConversionByMeter: {
    [key: string]: number;
};
/**
 * @internal
 */
export declare const UnitLabels: {
    [key: string]: string;
};
/**
 * @internal
 */
export declare const getUnitStr: (unit: string, power?: number) => string;
/**
 * Gets unit
 * value
 * sourceUnit
 * targetUnit
 * @internal
 */
export interface ValueWithUnit {
    value: number;
    unit: string;
}
/**
 * @internal
 */
export declare const getLengthValueByUnit: (value: number, sourceUnit: string, targetUnit: string, power?: number) => ValueWithUnit;
