"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.M = M;
exports.M_CODES = void 0;
const M_CODES = {
  M00: "PROGRAM_STOP",
  M01: "OPTIONAL_STOP",
  M03: "SPINDLE_FORWARD",
  M04: "SPINDLE_REVERSE",
  M05: "SPINDLE_STOP",
  M06: "TOOL_CHANGE",
  M07: "MIST_COOLANT_ON",
  M08: "FLOOD_COOLANT_ON",
  M09: "COOLANT_OFF",
  M21: "B_AXIS_LOCK",
  M22: "B_AXIS_UNLOCK",
  M29: "RIGID_TAPPING",
  M30: "PROGRAM_END",
  M50: "TSC_COOLANT_ON",
  M52: "THRU_TOOL_AIR_ON",
  M53: "THRU_TOOL_AIR_OFF",
  M80: "SYNCHRONIZED_TAPPING",
  M98: "SUBPROGRAM_CALL",
  M99: "RETURN_FROM_SUB_OR_LOOP",
  M107: "SAFE_START"
};
/**
 * Return an M codes' description by string or number
 *
 * @example ```
 *  M(30)             // => "PROGRAM_END"
 *  M("M6")           // => "TOOL_CHANGE"
 * ```
 */

exports.M_CODES = M_CODES;

function M(input) {
  if (typeof input === "number") {
    return M_CODES[`M${input}`];
  } else if (typeof input === "string") {
    return M_CODES[input];
  }

  return "";
}
