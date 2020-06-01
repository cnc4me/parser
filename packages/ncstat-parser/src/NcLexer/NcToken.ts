import { Token } from "ts-tokenizr";

import { Address } from "@/NcParser";
import { define, gCode, mCode } from "@/NcSpec";
import { Addresses } from "@/NcSpec/addresses";
import {
  CodeDefinition,
  ParsedTokenizrValue,
  Tokens,
  TokenTypes,
  TokenValue
} from "@/types";

// import { ValueToken } from "@/types";

export class NcToken {
  type: TokenTypes;
  text: string;
  pos: number;
  line: number;
  column: number;
  value: TokenValue;
  prefix?: string;
  // definition?: CodeDefinition;

  static from(token: Token): NcToken {
    return new NcToken(token);
  }

  constructor(token: Token) {
    this.type = token.type as TokenTypes;
    this.value = token.value as TokenValue;
    this.text = token.text;
    this.pos = token.pos;
    this.line = token.line;
    this.column = token.column;

    if (token.type === Tokens.ADDRESS) {
      const value = token.value as ParsedTokenizrValue;

      this.prefix = value.prefix;
      this.value = parseFloat(value.value);

      // switch (this.prefix) {
      //   case "M":
      //     this.definition = mCode(this.value);
      //     break;

      //   case "G":
      //     this.definition = gCode(this.value);
      //     break;

      //   case "R":
      //     this.definition = define(Addresses.R);
      //     break;

      //   case "Q":
      //     this.definition = define(Addresses.Q);
      //     break;

      //   default:
      //     this.definition = define("");
      //     break;
      // }
    }
  }

  toString(): string {
    const tokenAttr = [
      `type: ${this.type}`,
      `value: ${JSON.stringify(this.value)}`,
      `text: ${JSON.stringify(this.text)}`,
      `pos: ${this.pos}`,
      `line: ${this.line}`,
      `column: ${this.column}`
    ].join(", ");

    return `<${tokenAttr}>`;
  }

  // hasPrefix(prefix: string): boolean {
  //   return this.prefix === prefix;
  // }

  isA(type: Tokens.ADDRESS, prefix: string): boolean;
  isA(type: TokenTypes, prefix?: string): boolean {
    if (type !== this.type) {
      return false;
    }

    if (prefix && prefix !== this.value) {
      return false;
    }

    return true;
  }
}