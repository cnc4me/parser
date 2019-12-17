import StateMachine from "javascript-state-machine";

export type Maybe<T> = T | undefined;

export interface Point {
  [K: string]: number | undefined;

  X: number;
  Y: number;
  Z: number;
}

export interface Position extends Point {
  B: number;
}

export interface CannedPoint extends Point {
  I?: number;
  J?: number;
  K?: number;
  R: number;
  Q: number;
}

export interface NcCodeDef {
  COMMAND: string;
  GROUP: string;
}

export interface CannedCycle {
  cycleCommand: string;
  retractCommand: string;
}

export interface ProgramStateMachine extends StateMachine {
  startToolpath(): void;
  endToolpath(): void;
  endCannedCycle(): void;
  startCannedCycle(): void;
}
