import { ValueType, RuntimeValue, NumberVal, NullVal } from "./values.ts"
import { NodeType, Statement, Expression, Program, NumericLiteral, NullLiteral, BinaryExpression } from "../language/ast.ts"

function evaluate_program (program: Program): RuntimeValue {
    let lastEvaluated: RuntimeValue = { type: "null", value: "null" } as NullVal;
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
    }
    return lastEvaluated
}

function evaluate_numeric_binary_expression (leftHand: NumberVal, rightHand: NumberVal, operator: string ): NumberVal {
    let numResult: number = 0;
    if (operator == "+") {
        numResult = leftHand.value + rightHand.value;
    } else if (operator == "-") {
        numResult = leftHand.value - rightHand.value;
    } else if (operator == "*") {
        numResult = leftHand.value * rightHand.value;
    } else if (operator == "/") {
        if (rightHand.value !== 0) {
            numResult = leftHand.value / rightHand.value;
        } else {
            console.error("Dividing by 0 Error");
        }
    } else {
        numResult = leftHand.value % rightHand.value;
    }

    return { value: numResult, type: "number" };
}

function evaluate_binary_expression (binop: BinaryExpression): RuntimeValue {
    const leftHand = evaluate(binop.left);
    const rightHand = evaluate(binop.right);
    if (leftHand.type == "number" && rightHand.type == "number") {
        return evaluate_numeric_binary_expression(leftHand as NumberVal, rightHand as NumberVal, binop.operator)
    } 

    return { type: "null", value: "null"} as NullVal;
}

export function evaluate (astNode: Statement): RuntimeValue {
    switch (astNode.kind) {
        case "NumericLiteral":
            return { value: ((astNode as NumericLiteral).value), type: "number" } as NumberVal;
        case "NullLiteral":
            return { value: "null", type: "null"} as NullVal;
        case "Program":
            return evaluate_program(astNode as Program)
        case "BinaryExpression":
            return evaluate_binary_expression(astNode as BinaryExpression)
        default:
            console.error("This AST Node is Not Here", astNode)
            Deno.exit(0)
    }
}