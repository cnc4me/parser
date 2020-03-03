import { ActionContext } from "./ActionContext";
import { ParsingError } from "./ParsingError";
import { Token } from "./Token";
import { Action, Rule, Tags, TokenizrConfig } from "./types";
export declare class Tokenizr {
    static readonly defaults: {
        debug: boolean;
    };
    config: TokenizrConfig;
    _len: number;
    _pos: number;
    _line: number;
    _column: number;
    _input: string;
    _eof: boolean;
    _stopped: boolean;
    _ctx: ActionContext;
    _rules: Array<Rule>;
    _pending: Array<Token>;
    _after: Action | null;
    _before: Action | null;
    _finish: Action | null;
    _tag: Tags;
    _state: Array<string>;
    _transaction: Array<Array<Token>>;
    constructor(config?: Partial<TokenizrConfig>);
    /**
     * Reset the internal state
     */
    reset(): this;
    /**
     * Create an error message for the current position
     */
    error(message: string): ParsingError;
    /**
     * Configure debug operation
     */
    debug(debug: boolean): this;
    /**
     * Provide (new) input string to tokenize
     */
    input(input: string): this;
    /**
     * Push state
     */
    push(state: string): this;
    /**
     * Pop state
     */
    pop(): this | void;
    /**
     * get/set state
     */
    state(): string;
    state(state: string): this;
    /**
     * Set a tag
     */
    tag(tag: string): this;
    /**
     * Check whether tag is set
     */
    tagged(tag: string): boolean;
    /**
     * Unset a tag
     */
    untag(tag: string): this;
    /**
     * Configure a tokenization before-rule callback
     */
    before(action: Action): this;
    /**
     * Configure a tokenization after-rule callback
     */
    after(action: Action): this;
    /**
     * Configure a tokenization finish callback
     */
    finish(action: Action): this;
    /**
     * Configure a stateful tokenization rule
     */
    stateRule(state: string, pattern: RegExp, action: Function, name?: string): this;
    /**
     * Configure a tokenization rule
     */
    rule(pattern: RegExp, action: Function, name?: string): this;
    /**
     * Determine and return next token
     */
    token(): Token | null;
    /**
     * Determine and return all tokens
     */
    tokens(): Array<Token>;
    /**
     * Determine and generate tokens
     */
    /**
     * Peek at the next token or token at particular offset
     */
    peek(offset?: number): Token;
    /**
     * Skip one or more tokens
     */
    skip(len?: number): this;
    /**
     * Consume the current token (by expecting it to be a particular symbol)
     */
    consume(type: string, value?: unknown): Token;
    /**
     * Open tokenization transaction
     */
    begin(): this;
    /**
     * Determine depth of still open tokenization transaction
     */
    depth(): number;
    /**
     * Close (successfully) tokenization transaction
     */
    commit(): this;
    /**
     * Close (unsuccessfully) tokenization transaction
     */
    rollback(): this;
    /**
     * Execute multiple alternative callbacks
     */
    alternatives(...alternatives: Array<() => never>): any;
    /**
     * Output a debug message
     */
    _log(msg: string): void;
    /**
     * Determine and return the next token
     */
    _tokenize(): void;
    /**
     * Progress the line/column counter
     */
    private _progress;
    private pushRule;
}
//# sourceMappingURL=Tokenizr.d.ts.map