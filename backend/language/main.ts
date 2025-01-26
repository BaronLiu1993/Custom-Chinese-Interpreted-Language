import Parser from "./parser.ts"
import { evaluate } from "../runtime/interpreter.ts";
import Environment from "../runtime/environment.ts";
import { MK_BOOL, MK_NUMBER, NumberVal } from "../runtime/values.ts";

repl();

function repl () {
    const parser = new Parser()
    const env = new Environment()
    env.declareVariable("轩", MK_NUMBER(100));
    env.declareVariable("真", MK_BOOL(true));
    env.declareVariable("假", MK_BOOL(false))
    console.log("Repl v0.1")
    while (true) {
        const input = prompt(">")

        if (!input || input.includes("exit")) {
            Deno.exit(1)
        }

        const program = parser.produceAST(input)
        console.log(program)
        const result = evaluate(program, env)
        console.log(result)
    }
}