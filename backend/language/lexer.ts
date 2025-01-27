export enum TokenType {
    Null,
    Number,
    Identifier,
    Equals,
    OpenParen,
    ClosedParen,
    CurlyOpenParen,
    CurlyClosedParen,
    BinaryOperator,
    Let,
    Const,
    Func,
    Return,
    For,
    While,
    If,
    Else,
    SemiColon,
    EOF
}

export interface Token {
    value: string;
    type: TokenType;
}

const token = (value = "", type: TokenType): Token => {
    return { value, type };
};

export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split(""); //Optimise for later because this leaks a lot of memory

    while (src.length > 0) {
        const current = src[0];
        if (current === "(") {
            tokens.push(token(src.shift()!, TokenType.OpenParen));
        } else if (current === ")") {
            tokens.push(token(src.shift()!, TokenType.ClosedParen));
        } else if (current === "{") {
            tokens.push(token(src.shift()!, TokenType.CurlyOpenParen));
        } else if (current === "}") {
            tokens.push(token(src.shift()!, TokenType.CurlyClosedParen));
        } else if ("+-*/%".includes(current)) {
            tokens.push(token(src.shift()!, TokenType.BinaryOperator));
        } else if (current === "=") {
            tokens.push(token(src.shift()!, TokenType.Equals));
        } else if (current === "；") {
            tokens.push(token(src.shift()!, TokenType.SemiColon));
        }else if (/[0-9]/.test(current)) {
            let num = "";
            while (/[0-9]/.test(src[0])) {
                num += src.shift();
            }
            tokens.push(token(num, TokenType.Number));
        } else if (/[一-鿿]/.test(current)) {
            let chineseWord = "";
            while (/[一-鿿]/.test(src[0])) {
                chineseWord += src.shift();
            }
            if (chineseWord === "让") {
                tokens.push(token(chineseWord, TokenType.Let));
            } else if (chineseWord === "工作") {
                tokens.push(token(chineseWord, TokenType.Func));
            } else if (chineseWord === "返回") {
                tokens.push(token(chineseWord, TokenType.Return));
            } else if (chineseWord === "如果") {
                tokens.push(token(chineseWord, TokenType.If));
            } else if (chineseWord == "而") {
                tokens.push(token(chineseWord, TokenType.While));
            } else if (chineseWord == "为") {
                tokens.push(token(chineseWord, TokenType.For));
            } else if (chineseWord == "无") {
                tokens.push(token(chineseWord, TokenType.Null))
            } else if (chineseWord == "常量") {
                tokens.push(token(chineseWord, TokenType.Const))
            } else {
                tokens.push(token(chineseWord, TokenType.Identifier));
            }
        } else if (/\s/.test(current)) {
            src.shift();
        } else {
            throw new Error(`Unexpected character: ${current}`);
        }
    }

    tokens.push({value: "EndOfFile", type: TokenType.EOF,});
    return tokens;
}

const source = await Deno.readTextFile("./test.txt");
for (const token of tokenize(source)) {
    console.log(token)
}