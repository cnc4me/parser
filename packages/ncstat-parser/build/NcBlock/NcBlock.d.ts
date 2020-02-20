import { NcToken } from "@ncstat/lexer";
import { Position } from "../types";
export declare class NcBlock {
    tokens: NcToken[];
    retractCode?: string;
    getPosition(): Position;
    static create(tokens: NcToken[]): NcBlock;
    constructor(tokens: NcToken[]);
    $has(prefix: string): boolean;
    $value(prefix: string): number;
    map(iter: any): ReturnType<typeof iter>;
    toString(): string;
    get lineNumber(): number;
    get hasToolCall(): boolean;
    get hasToolChange(): boolean;
    get hasMovement(): boolean;
    get cannedCycleStartCode(): string | undefined;
    get isNline(): boolean;
    get isStartOfCannedCycle(): boolean;
    get skipLevel(): number;
    get comment(): string;
    get A(): number;
    get B(): number;
    get C(): number;
    get D(): number;
    get E(): number;
    get F(): number;
    get G(): number[];
    get H(): number;
    get I(): number;
    get J(): number;
    get K(): number;
    get L(): number;
    get M(): number;
    get N(): number;
    get O(): number;
    get P(): number;
    get Q(): number;
    get R(): number;
    get S(): number;
    get T(): number;
    get U(): number;
    get V(): number;
    get W(): number;
    get X(): number;
    get Y(): number;
    get Z(): number;
}
//# sourceMappingURL=NcBlock.d.ts.map