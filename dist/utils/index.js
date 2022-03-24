"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrantTypeFromScopeName = void 0;
const scopes_1 = require("../constants/scopes");
/**
 * For get auth grant type of scope by its name
 * @param scopeName Full scope name from `SCOPES`
 * @returns scope's `GRANT_TYPE`
 */
const getGrantTypeFromScopeName = (scopeName) => {
    for (let key of Object.keys(scopes_1.SCOPES)) {
        // @ts-ignore
        if (scopes_1.SCOPES[key].name === scopeName) {
            // @ts-ignore
            return scopes_1.SCOPES[key].authMode;
        }
    }
};
exports.getGrantTypeFromScopeName = getGrantTypeFromScopeName;
//# sourceMappingURL=index.js.map