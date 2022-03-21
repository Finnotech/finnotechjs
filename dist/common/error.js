"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FinnotechError extends Error {
    constructor(functionName, data) {
        console.error(`${functionName}: ${data}`);
        super(data);
    }
}
exports.default = FinnotechError;
//# sourceMappingURL=error.js.map