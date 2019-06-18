import { ICannedCycle } from "../types";
import Block from "./Block";
import Point from "./Point";

export default class CannedCycle implements ICannedCycle {
  public Z?: number;
  public R?: number;
  public F?: number;
  public Q?: number;

  public cycleCommand: string;
  public retractCommand: string;

  private points: Point[] = [];

  constructor(block: Block) {
    this.Q = block.values.Q;
    this.Z = block.values.Z;
    this.R = block.values.R;
    this.F = block.values.F;

    this.cycleCommand = block.getCannedCycleStartCode();
    this.retractCommand = block.getRetractCode();
  }

  get peck(): number {
    return this.Q;
  }

  get depth(): number {
    return this.Z;
  }

  get retract(): number {
    return this.R;
  }

  get feedrate(): number {
    return this.F;
  }

  public addPoint(point: Point): void {
    const position = point instanceof Block ? point.getPosition() : point;

    this.points.push(position);
  }

  public getPoints(): Point[] {
    return this.points;
  }

  public getPointCount(): number {
    return this.points.length;
  }
}
