export type ValueType = "null" | "number" | "boolean";

export interface RuntimeValue {
    type: ValueType;
}

export interface NullVal extends RuntimeValue {
    type: "null";
    value: null;
}

export interface NumberVal extends RuntimeValue {
    type: "number";
    value: number;
}

export interface BooleanVal extends RuntimeValue {
    type: "boolean";
    value: boolean;
}

export function MK_BOOL (b = true) {
    return { type: "boolean", value: b } as BooleanVal
}

export function MK_NULL () {
    return { type: "null", value: null} as NullVal
}

export function MK_NUMBER (n = 0) {
    return { type: "number", value: n} as NumberVal;
}