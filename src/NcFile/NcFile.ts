import fs from "fs";
import { each, filter, min, split, uniq } from "lodash/fp";
import path from "path";

export class NcFile {
  static async createFromBuffer(buffer: Buffer): Promise<NcFile> {
    return new NcFile(buffer.toString());
  }

  static async createFromPath(abspath: string): Promise<NcFile> {
    if (!path.isAbsolute(abspath)) {
      throw Error("The path must be absolute.");
    }

    const buffer = await fs.promises.readFile(abspath);

    return NcFile.createFromBuffer(buffer);
  }

  constructor(private contents = "") {
    this.contents = contents;
  }

  getLines(options = { filterEmptyLines: true }): string[] {
    const lines = split("\n", this.contents);

    return options.filterEmptyLines ? filter(l => l !== " ", lines) : lines;
  }

  async getDeepestZ(): Promise<number | undefined> {
    const lines = filter(l => l !== " ", this.getLines());
    const z: number[] = [];
    const zRegex = /Z(-[0-9.]+)\s/g;

    each(line => {
      const m = zRegex.exec(line);

      if (m) {
        z.push(parseFloat(m[1]));
      }
    }, lines);

    return min(uniq(z));
  }
}
