import { NcParser } from "@/NcParser";
import { NcProgram, Toolpath } from "@/NcProgram";

const simpleProgram = `%
O1234 (SIMPLE)
(DATE - JUN. 06 2020)
(TIME - 9:02 AM)
(MCX FILE - V:\TEST\EXAMPLE\SIMPLE.MCAM)
(NC FILE - V:\TEST\EXAMPLE\SIMPLE.NC)

N43 ( #14 [.182"] DRILL, CARB, TSC )
T43 M6
M01 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G54
X1.75 Y.19 S10495 M3
M50 (TSC COOLANT ON)
G4 X2.
G43 H43 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
X.75
Y1.81
X1.75
G80
M5
G91 G28 Z0.
M30
%`;

const parser = new NcParser();
const program: NcProgram = parser.parse(simpleProgram);

describe("Analysis", () => {
  it(`has 42 tokens`, () => {
    expect(program.tokenCount).toBe(42);
  });

  it(`has 23 blocks / lines`, () => {
    expect(program.blockCount).toBe(23);
  });

  it(`is program number 1234`, () => {
    expect(program.number).toBe(1234);
  });

  it(`is named "SIMPLE"`, () => {
    expect(program.name).toBe("SIMPLE");
  });

  it(`to have 1 toolpath`, () => {
    expect(program.toolpathCount).toBe(1);
  });

  it(`toolpath to be using "G54"`, () => {
    expect(program.offsets).toContain("G54");
  });
});

describe(`Header`, () => {
  const header = program.getHeader();

  it(`is 4 lines long`, () => {
    expect(header).toHaveLength(4);
  });

  it(`has the correct 1st line`, () => {
    expect(header[0]).toBe(`DATE - JUN. 06 2020`);
  });

  it(`has the correct 2nd line`, () => {
    expect(header[1]).toBe(`TIME - 9:02 AM`);
  });

  it(`has the correct 3rd line`, () => {
    expect(header[2]).toBe(`MCX FILE - V:\TEST\EXAMPLE\SIMPLE.MCAM`);
  });

  it(`has the correct 4th line`, () => {
    expect(header[3]).toBe(`NC FILE - V:\TEST\EXAMPLE\SIMPLE.NC`);
  });

  it(`can be queried, prg.queryHeader("TIME")`, () => {
    expect(program.queryHeader("TIME")).toBe(`9:02 AM`);
  });

  it(`can be accessed as an object, prg.header.DATE;`, () => {
    expect(program.header.DATE).toBe(`JUN. 06 2020`);
  });

  it(`can be accessed as an array, prg.header["NC FILE"];`, () => {
    expect(program.header["NC FILE"]).toBe(`V:\TEST\EXAMPLE\SIMPLE.NC`);
  });
});

describe(`Toolpaths`, () => {
  const toolpath = program.getToolpath(0);

  it(`to be an instance of Toolpath`, () => {
    expect(toolpath).toBeInstanceOf(Toolpath);
  });

  it(`to be an instance of Toolpath`, () => {
    const toolpath = program.getToolpath(0);

    expect(toolpath).toBeInstanceOf(Toolpath);
  });
});

describe(`Tools`, () => {
  const tools = program.getTools();

  // it(`to have 1 tool`, () => {
  //   expect(program.toolList).toHaveLength(1);
  // });

  it(`tool number is 43`, () => {
    expect(tools[0].number).toBe(43);
  });

  it(`tool name is "#14 [.182"] DRILL, CARB, TSC"`, () => {
    expect(tools[0].desc).toBe(`#14 [.182\"] DRILL, CARB, TSC`);
  });
});

//   it.skip('can be output with line numbers "Nnnn"', () => {
//     const numberedProgram = `%
// N0001 O1234 (SIMPLE)
// N0002 (DATE - JUN. 06 2020)
// N0003 (TIME - 9:02 AM)
// N0004 (MCX FILE - V:\TEST\EXAMPLE\SIMPLE.MCAM)
// N0005 (NC FILE - V:\TEST\EXAMPLE\SIMPLE.NC)
// N0006
// N0007 43 ( #14 [.182"] DRILL, CARB, TSC )
// N0008 T43 M6
// N0009 M01 ( #14 [.182"] DRILL, CARB, TSC )
// N0010 G0 G90 G54
// N0011 X1.75 Y.19 S10495 M3
// N0012 M50 (TSC COOLANT ON)
// N0013 G4 X2.
// N0014 G43 H43 Z1. T44
// N0015 G98 G81 Z-.5631 R.1 F83.96
// N0016 X.75
// N0017 Y1.81
// N0018 X1.75
// N0019 G80
// N0020 M5
// N0021 G91 G28 Z0.
// N0022 M30
// %`
//     expect(numberedProgram).toBe(program.toStringWithLineNumbers());
//   })
