import { Statement, Program, Expression, BinaryExpression, NumericLiteral, Identifier } from "./ast.ts"
import { tokenize, Token, TokenType } from "./lexer.ts"

export default class Parser {
    private tokens: Token[] = [];
    
    //private not_eof (): boolean {
    //    return this.tokens[0].type != TokenType.;
    //}
    
    public produceAST (sourceCode: string) {
        this.tokens = tokenize(sourceCode)
        const program: Program = {
            kind: "Program",
            body: [],
        };

        return program;
    }
}