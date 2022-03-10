"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCOPES = exports.GRANT_TYPE = void 0;
exports.GRANT_TYPE = {
    CLIENT_CREDENTIALS: 'client_credentials',
    AUTHORIZATION_CODE: 'authorization_code',
    SMS: '',
};
exports.SCOPES = {
    ibanInquiry: {
        name: 'oak:iban-inquiry:get',
        authMode: exports.GRANT_TYPE.CLIENT_CREDENTIALS,
    },
};
//# sourceMappingURL=scopes.js.map