"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FinnotechError extends Error {
    constructor(functionName, data) {
        super();
        this.message = `${functionName}: ${data}`;
        this.data = data;
    }
}
exports.default = FinnotechError;
//# sourceMappingURL=error.js.map