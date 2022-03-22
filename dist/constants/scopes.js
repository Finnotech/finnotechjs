"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCOPES = exports.GRANT_TYPE = void 0;
var GRANT_TYPE;
(function (GRANT_TYPE) {
    GRANT_TYPE["CLIENT_CREDENTIALS"] = "client_credentials";
    GRANT_TYPE["AUTHORIZATION_CODE"] = "authorization_code";
    GRANT_TYPE["SMS"] = "";
})(GRANT_TYPE = exports.GRANT_TYPE || (exports.GRANT_TYPE = {}));
exports.SCOPES = {
    ibanInquiry: {
        name: 'oak:iban-inquiry:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    cardBalance: {
        name: 'oak:card-balance:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
};
//# sourceMappingURL=scopes.js.map