"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCOPES = exports.GRANT_TYPE = void 0;
var GRANT_TYPE;
(function (GRANT_TYPE) {
    GRANT_TYPE["CLIENT_CREDENTIALS"] = "client_credentials";
    GRANT_TYPE["AUTHORIZATION_CODE"] = "authorization_code";
    GRANT_TYPE["SMS"] = "SMS";
})(GRANT_TYPE = exports.GRANT_TYPE || (exports.GRANT_TYPE = {}));
exports.SCOPES = {
    ibanInquiry: {
        name: 'oak:iban-inquiry:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    groupIbanInquiryPost: {
        name: 'oak:group-iban-inquiry:post',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    groupIbanInquiryGet: {
        name: 'oak:group-iban-inquiry:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    cardBalance: {
        name: 'oak:card-balance:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    cardStatement: {
        name: 'oak:card-statement:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    depositToIban: {
        name: 'oak:deposit-to-iban:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    cifInquiry: {
        name: 'oak:cif-inquiry:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    shahabInquiry: {
        name: 'oak:shahab-inquiry:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    facilityInquiry: {
        name: 'credit:facility-inquiry:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
    backChequeInquiry: {
        name: 'redit:back-cheques:get',
        authMode: GRANT_TYPE.CLIENT_CREDENTIALS,
    },
};
//# sourceMappingURL=scopes.js.map