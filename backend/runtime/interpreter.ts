import { ValueType, RuntimeValue, NumberVal, NullVal, MK_NULL } from "./values.ts"
import { NodeType, Statement, Expression, Program, NumericLiteral, NullLiteral, BinaryExpression, Identifier, VariableDeclaration } from "../language/ast.ts"
import Environment from "./environment.ts";

function evaluate_program (program: Program, env: Environment): RuntimeValue {
    let lastEvaluated: RuntimeValue = MK_NULL();
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
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

function eval_identifier (ident: Identifier, env: Environment): RuntimeValue {
    const val = env.lookupVar(ident.symbol)
    return val;
}

function evaluate_binary_expression (binop: BinaryExpression, env: Environment): RuntimeValue {
    const leftHand = evaluate(binop.left, env);
    const rightHand = evaluate(binop.right, env);
    if (leftHand.type == "number" && rightHand.type == "number") {
        return evaluate_numeric_binary_expression(leftHand as NumberVal, rightHand as NumberVal, binop.operator)
    } 

    return MK_NULL();
}

function evaluate_var_declaration (declaration: VariableDeclaration, env: Environment): RuntimeValue {
    const value = declaration.value ? evaluate(declaration.value, env): MK_NULL();
    return env.declareVariable(declaration.identifier, value, declaration.constant);
}

export function evaluate (astNode: Statement, env: Environment): RuntimeValue {
    switch (astNode.kind) {
        case "NumericLiteral":
            return { value: ((astNode as NumericLiteral).value), type: "number" } as NumberVal;
        case "NullLiteral":
            return MK_NULL();
        case "Program":
            return evaluate_program(astNode as Program, env as Environment)
        case "Identifier":
            return eval_identifier(astNode as Identifier, env as Environment)
        case "BinaryExpression":
            return evaluate_binary_expression(astNode as BinaryExpression, env as Environment)
        case "VariableDeclaration":
            return evaluate_var_declaration(astNode as VariableDeclaration, env as Environment)
        default:
            console.error("This AST Node is Not Here", astNode)
            Deno.exit(0)
    }
}