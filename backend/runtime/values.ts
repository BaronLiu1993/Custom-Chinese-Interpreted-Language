export type ValueType = "null" | "number";

export interface RuntimeValue {
    type: ValueType;
}

export interface NullVal extends RuntimeValue {
    type: "null";
    value: "null";
}

export interface NumberVal extends RuntimeValue {
    type: "number";
    value: number;
}