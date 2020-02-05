import { NcLine } from "../../Toolpath/NcLine";
import { getBlocks } from "./index";

const code = `%
O1234 (TEST PROGRAM)
(CREATED: 12/20/2019)
(TOOLS)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
N5 ( #14 [.182"] DRILL, CARB, TSC )
T43 M6
G0 G90 G54 X.75 Y.19
S10495 M3
G43 H#518 Z1. T44
M8
G4 X1000
G98 G81 Z-.5631 R.1 F83.96
Y1.5
X5.
G80
M9
M5
G91 G28 Z0.
M30
%`;

const blocks = getBlocks(code);

try {
  for (const block of blocks) {
    const line = new NcLine(block);
    // console.log(` ============= ${block.length} =============`);
    // console.log(block.toString());
    console.log(line);
  }
} catch (err) {
  console.error(err.toString());
}
