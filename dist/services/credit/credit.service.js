"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../common/helper");
const scopes_1 = require("../../constants/scopes");
class CreditService {
    constructor(tokenService, httpService) {
        this.tokenService = tokenService;
        this.httpService = httpService;
    }
    /**
     * For facility inquiry service. [document page](https://devbeta.finnotech.ir/credit-facility-inquiry-get.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    facilityInquiry(data, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceScope = scopes_1.SCOPES.facilityInquiry.name;
            const clientId = this.tokenService.clientId;
            const path = `/credit/v2/clients/${clientId}/users/${data.nid}/facilityInquiry`;
            const finalTrackId = trackId || (0, helper_1.generateUUID)();
            yield this.tokenService.getClientCredentialToken([serviceScope]);
            const ccToken = this.tokenService.getAccessToken(serviceScope);
            try {
                const finnotechResponse = yield this.httpService.get(path, {
                    params: { trackId: finalTrackId },
                    headers: {
                        Authorization: `Bearer ${ccToken}`,
                        'X-Scope-Name': serviceScope,
                    },
                });
                const result = finnotechResponse.data;
                return result;
            }
            catch (err) {
                const error = err;
                throw error;
            }
        });
    }
    /**
     * For backCheque inquiry service. [document page](https://devbeta.finnotech.ir/credit-back-cheques-get.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    backChequeInquiry(data, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceScope = scopes_1.SCOPES.backChequeInquiry.name;
            const clientId = this.tokenService.clientId;
            const path = `/credit/v2/clients/${clientId}/users/${data.nid}/backCheques`;
            const finalTrackId = trackId || (0, helper_1.generateUUID)();
            yield this.tokenService.getClientCredentialToken([serviceScope]);
            const ccToken = this.tokenService.getAccessToken(serviceScope);
            try {
                const finnotechResponse = yield this.httpService.get(path, {
                    params: { trackId: finalTrackId },
                    headers: {
                        Authorization: `Bearer ${ccToken}`,
                        'X-Scope-Name': serviceScope,
                    },
                });
                const result = finnotechResponse.data;
                return result;
            }
            catch (err) {
                const error = err;
                throw error;
            }
        });
    }
}
exports.default = CreditService;
//# sourceMappingURL=credit.service.js.map