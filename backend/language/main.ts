import Parser from "./parser.ts"
import { evaluate } from "../runtime/interpreter.ts";
import Environment from "../runtime/environment.ts";
import { NumberVal } from "../runtime/values.ts";

repl();

async function repl () {
    const parser = new Parser()
    const env = new Environment()
    env.declareVariable("轩", {value: 100, type: "number"} as NumberVal);
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