"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var gcodes_1 = require("./gcodes");
var mcodes_1 = require("./mcodes");
var Modals_1 = require("./Modals");
exports.Modals = Modals_1.Modals;
exports.G_CODES = {};
exports.M_CODES = {};
exports.CANNED_CYCLE_START_CODES = [
    "G73",
    "G74",
    "G81",
    "G82",
    "G83",
    "G84",
    "G85",
    "G86",
    "G87"
];
exports.COMMANDS = {
    G: function (n) { return exports.G_CODES["G" + n]; },
    M: function (n) { return exports.M_CODES["M" + n]; }
};
_.forEach(gcodes_1.G_CODES, function (groupName, group) {
    _.forEach(groupName, function (command, gcode) {
        exports.G_CODES[gcode] = {
            COMMAND: command,
            GROUP: group
        };
    });
});
_.forEach(mcodes_1.M_CODES, function (command, mcode) {
    exports.M_CODES[mcode] = {
        COMMAND: command,
        GROUP: "MACHINE"
    };
});
