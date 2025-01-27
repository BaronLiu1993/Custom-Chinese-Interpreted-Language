export type NodeType = 
    | "Program" 
    | "NumericLiteral" 
    | "Identifier" 
    | "BinaryExpression" 
    | "CallExpression" 
    | "UnaryExpression" 
    | "VariableDeclaration"
    | "NullLiteral"
    | "ForStatement"
    | "FunctionDecalaration" ;

export interface Statement {
    kind: NodeType;
}

export interface Program extends Statement {
    kind: "Program",
    body: Statement[];
}

export interface VariableDeclaration extends Statement {
    kind: "VariableDeclaration",
    constant: boolean,
    identifier: string,
    value?: Expression;
}

export interface ForStatement extends Statement {
    kind: "ForStatement";
    identifier: Identifier;
    iterable: Expression;
    body: Statement[];
}

export interface Expression extends Statement {

}

export interface BinaryExpression extends Expression {
    kind: "BinaryExpression",
    left: Expression,
    right: Expression,
    operator: string;
}

export interface Identifier extends Expression {
    kind: "Identifier"
    symbol: string;
}

export interface NumericLiteral extends Expression {
    kind: "NumericLiteral",
    value: number;
}

export interface NullLiteral extends Expression {
    kind: "NullLiteral",
    value: "null"
}



