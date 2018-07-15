"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var which_1 = require("which");
var GIT_BIN = which_1.sync('git');
var MATCHER = {
    compare: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var actual = args.shift();
        var expected = args.shift();
        var result = child_process_1.spawnSync(GIT_BIN, [
            'diff',
            '--no-prefix',
            '--no-color',
            '--exit-code',
            '--no-index',
            expected,
            actual
        ]);
        switch (result.status) {
            case 0:
                return {
                    pass: true
                };
            case 1:
                return {
                    message: "Diff:\n" + result.stdout
                        .toString()
                        .split('\n')
                        .map(function (e) { return "  " + e; })
                        .join('\n'),
                    pass: false
                };
            default:
                throw new Error("git command error.\n" + result.stderr.toString());
        }
    }
};
function toHaveFiles(util, customEqualityTesters) {
    return MATCHER;
}
exports.fileTreeMatcherFactories = {
    toHaveFiles: toHaveFiles
};
//# sourceMappingURL=index.js.map