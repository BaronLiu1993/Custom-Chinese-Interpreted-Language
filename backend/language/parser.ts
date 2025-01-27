import { Statement, Program, Expression, BinaryExpression, NumericLiteral, Identifier, NullLiteral, VariableDeclaration, AssignmentExpression } from "./ast.ts";
import { tokenize, Token, TokenType } from "./lexer.ts";

export default class Parser {
    private tokens: Token[] = [];
    
    private not_eof(): boolean {
        return this.tokens[0].type !== TokenType.EOF;
    }
    
    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program",
            body: [],
        };

        while (this.not_eof()) {
            program.body.push(this.parse_statement());
        }

        return program;
    }

    private eat(): Token {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, err: string): Token {
        const token = this.eat();
        if (token.type !== type) {
            console.error(`Parse Error: ${err}, found ${token.type}`);
            Deno.exit(1);
        }
        return token;
    }

    private at(): Token {
        return this.tokens[0] as Token;
    }

    private parse_statement(): Statement {
        switch (this.at().type) {
            case TokenType.Let:
                return this.parse_var_declaration();
            case TokenType.Const:
                return this.parse_var_declaration();
            default: 
                return this.parse_expression();
        } 
    }

    
    ///private parse_for_declaration(): Statement {
    ///    const isFor = this.eat().type == TokenType.For
    ///    const identifier = this.expect(TokenType.Identifier, "Expected identifier name following FOR keyword");
    ///}
    
    private parse_var_declaration(): Statement {
        const isConstant = this.eat().type == TokenType.Const;
        const identifier = this.expect(TokenType.Identifier, "Expected identifier name following FOR keyword").value;

        if (this.at().type == TokenType.SemiColon) {
            this.eat();
            if (isConstant) {
                throw "Must assign value to constant expression. No value provided";
            }

            return { kind: "VariableDeclaration", value: this.parse_expression(), identifier, constant: false } as VariableDeclaration;
        }

        this.expect(TokenType.Equals, "Expected Equals token following the identifier in variable declaration")
        const declaration = { kind: "VariableDeclaration", value: this.parse_expression(), identifier, constant: isConstant } as  VariableDeclaration

        this.expect(TokenType.SemiColon, "Variable declaration must have semicolon")
        return declaration
    }

    

    private parse_expression(): Expression {
        const left = this.parse_additive_expression()
        
        if (this.at().type == TokenType.Equals) {
            this.eat();
            const value = this.parse_assignment_expression()
            return { value, assignee: left, kind: "AssignmentExpression"} as AssignmentExpression;
        }
    }

    private parse_assignment_expression(): Expression {
        throw new Error("DNE")
    }

    private parse_additive_expression(): Expression {
        let left = this.parse_multiplicative_expression();

        while (this.at().value === "+" || this.at().value === "-") {
            const operator = this.eat().value;
            const right = this.parse_multiplicative_expression();
            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            } as BinaryExpression;
        }

        return left;
    }

    private parse_multiplicative_expression(): Expression {
        let left = this.parse_primary_expression();

        while (this.at().value === "*" || this.at().value === "/" || this.at().value === "%") {
            const operator = this.eat().value;
            const right = this.parse_primary_expression();
            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            } as BinaryExpression;
        }

        return left;
    }

    private parse_primary_expression(): Expression {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Null:
                this.eat()
                return { kind: "NullLiteral", value: "null" } as NullLiteral
            case TokenType.Number:
                return { kind: "NumericLiteral", value: parseFloat(this.eat().value) } as NumericLiteral;
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.OpenParen: {
                this.eat();
                const value = this.parse_expression();
                this.expect(TokenType.ClosedParen, "Expected closing parenthesis");
                return value;
            }
            case TokenType.ClosedParen:
            default:
                console.error("Unexpected Token Found During Parsing:", this.at());
                Deno.exit(1);
        }
    }
}
