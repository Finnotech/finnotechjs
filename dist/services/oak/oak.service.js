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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scopes_1 = require("../../constants/scopes");
const error_1 = __importDefault(require("../../common/error"));
const helper_1 = require("../../common/helper");
class OakService {
    constructor(tokenService, httpService) {
        this.tokenService = tokenService;
        this.httpService = httpService;
    }
    /**
     * For iban inquiry service. [document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html)
     * @param data required data for service call
     * @param trackId `Optional` tracking code. should be **unique** in every request
     * @returns service result
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
                throw new error_1.default('getClientCredentialToken', error);
            }
        });
    }
}
exports.default = OakService;
//# sourceMappingURL=oak.service.js.map