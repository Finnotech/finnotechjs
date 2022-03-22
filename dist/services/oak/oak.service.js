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
const scopes_1 = require("../../constants/scopes");
const helper_1 = require("../../common/helper");
class OakService {
    constructor(tokenService, httpService) {
        this.tokenService = tokenService;
        this.httpService = httpService;
    }
    /**
     * For iban inquiry service. [document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    ibanInquiry(data, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceScope = scopes_1.SCOPES.ibanInquiry.name;
            const clientId = this.tokenService.clientId;
            const path = `/oak/v2/clients/${clientId}/ibanInquiry`;
            const finalTrackId = trackId || (0, helper_1.generateUUID)();
            const accessToken = yield this.tokenService.getAccessToken(serviceScope);
            try {
                const finnotechResponse = yield this.httpService.get(path, {
                    params: { iban: data.iban, trackId: finalTrackId },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
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
     * For card balance service. [document page](https://devbeta.finnotech.ir/oak-card-balance.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    cardBalance(data, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceScope = scopes_1.SCOPES.cardBalance.name;
            const clientId = this.tokenService.clientId;
            const path = `/oak/v2/clients/${clientId}/card/balance`;
            const finalTrackId = trackId || (0, helper_1.generateUUID)();
            const accessToken = yield this.tokenService.getAccessToken(serviceScope);
            try {
                const finnotechResponse = yield this.httpService.post(path, { card: data.card }, {
                    params: { trackId: finalTrackId },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
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
     * For card statement service. [document page](https://devbeta.finnotech.ir/oak-card-statement.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    cardStatement(data, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceScope = scopes_1.SCOPES.cardStatement.name;
            const clientId = this.tokenService.clientId;
            const path = `/oak/v2/clients/${clientId}/card/statement`;
            const finalTrackId = trackId || (0, helper_1.generateUUID)();
            const accessToken = yield this.tokenService.getAccessToken(serviceScope);
            try {
                const finnotechResponse = yield this.httpService.post(path, {
                    card: data.card,
                    fromDate: data.fromDate || '',
                    toDate: data.toDate || '',
                }, {
                    params: { trackId: finalTrackId },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
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
     * For deposit to iban service. [document page](https://devbeta.finnotech.ir/oak-deposits-to-IBAN-get.html?utm_medium=npm-package)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service response body
     */
    depositToIban(data, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceScope = scopes_1.SCOPES.depositToIban.name;
            const clientId = this.tokenService.clientId;
            const path = `/oak/v2/clients/${clientId}/iban`;
            const finalTrackId = trackId || (0, helper_1.generateUUID)();
            const accessToken = yield this.tokenService.getAccessToken(serviceScope);
            try {
                const finnotechResponse = yield this.httpService.get(path, {
                    params: {
                        bank: data.bank,
                        deposit: data.deposit,
                        trackId: finalTrackId,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
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
exports.default = OakService;
//# sourceMappingURL=oak.service.js.map