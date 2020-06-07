import { EventEmitter } from "eventemitter3";
import { Tokenizr } from "ts-tokenizr";

import { makeDebugger } from "@/lib";
import { NcToken, tokenizr } from "@/NcLexer";
import { NcLexerConfig } from "@/types";

const debug = makeDebugger("lexer");

export class NcLexer extends EventEmitter {
  static readonly defaults = {
    debug: false,
    tokens: {
      NEWLINE: true,
      EOF: false
    }
  };

  config: NcLexerConfig;

  private readonly tokenizr: Tokenizr;

  constructor(config?: Partial<NcLexerConfig>) {
    super();
    this.tokenizr = tokenizr;
    this.config = { ...NcLexer.defaults, ...config };

    debug("Lexer created with config %o", this.config);
  }

  /**
   * Sugar method for creating an array from
   * the tokenize generator method.
   */
  tokens(input: string): NcToken[] {
    return Array.from(this.tokenize(input));
  }

  /**
   * @emits token NcToken
   */
  *tokenize(input: string): Generator<NcToken> {
    let token: NcToken | null;

    this.tokenizr.debug(this.config.debug);
    this.tokenizr.input(input);

    debug("Tokenizing input");

    while ((token = this.getNextToken()) !== null) {
      if (token.isA("NEWLINE") && this.config.tokens.NEWLINE === false)
        continue;

      if (token.isA("EOF") && this.config.tokens.EOF === false)
        continue;

      this.emit("token", token);

      yield token;
    }
  }

  /**
   * Wrap the generic Tokenizr token
   *
   * This is mostly to unpack token.value.value and token.value.prefix
   * onto the token itself.
   *
   * @TODO More methods on the token?
   */
  private getNextToken(): NcToken | null {
    const token = this.tokenizr.token();

    return token ? NcToken.from(token) : null;
  }
}
