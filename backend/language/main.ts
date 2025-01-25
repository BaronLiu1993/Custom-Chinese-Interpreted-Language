import Parser from "./parser.ts"

repl();

async function repl () {
    const parser = new Parser()
    console.log("Repl ")
    while (true) {
        const input = prompt(">")

        if (!input || input.includes("exit")) {
            Deno.exit(1)
        }

        const program = parser.produceAST(input)
        console.log(program)
    }
}