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
const error_1 = __importDefault(require("../../common/error"));
const scopes_1 = require("../../constants/scopes");
class TokenService {
    constructor(data, httpService) {
        this.clientId = data.clientId;
        this._clientSecret = data.clientSecret;
        this._nid = data.nid;
        this._getAccessToken = data.getAccessTokenFunction;
        this._getRefreshToken = data.getRefreshTokenFunction;
        this._setTokens = data.setTokensFunction;
        this._httpService = httpService;
    }
    /**
     * **Internal Method** for getting service access token
     * @param scopeName scope name
     * @returns result of initiated `getAccessToken` function
     */
    getAccessToken(scopeName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._getAccessToken) {
                throw new error_1.default('getAccessToken', 'getAccessToken function is not defined');
            }
            if (this._getAccessToken.constructor.name === 'AsyncFunction') {
                return yield this._getAccessToken(scopeName);
            }
            return this._getAccessToken(scopeName);
        });
    }
    /**
     * For getting client-credentials token for requested scopes by their scope names. **This function will finally call `setTokens` function**. [document page](https://devbeta.finnotech.ir/boomrang-get-clientCredential-token.html?sandbox=undefined)
     * @param scopes List of scope names. Final token information will be for these scopes
     */
    getClientCredentialToken(scopes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (scopes.length === 0) {
                throw new error_1.default('getClientCredentialToken', 'scopes should not be empty');
            }
            const authHeader = 'Basic ' +
                Buffer.from(`${this.clientId}:${this._clientSecret}`).toString('base64');
            const requestData = {
                grant_type: 'client_credentials',
                nid: this._nid,
                scopes: scopes.join(','),
            };
            try {
                const finnotechResponse = yield this._httpService.post('/dev/v2/oauth2/token', requestData, {
                    headers: {
                        Authorization: authHeader,
                    },
                });
                const { value, refreshToken, lifeTime, scopes, } = finnotechResponse.data.result;
                if (!this._setTokens) {
                    return;
                }
                if (this._setTokens.constructor.name === 'AsyncFunction') {
                    return yield this._setTokens({
                        accessToken: value,
                        refreshToken,
                        lifeTime,
                        scopes,
                        tokenType: scopes_1.GRANT_TYPE.CLIENT_CREDENTIALS,
                    });
                }
                return this._setTokens({
                    accessToken: value,
                    refreshToken,
                    lifeTime,
                    scopes,
                    tokenType: scopes_1.GRANT_TYPE.CLIENT_CREDENTIALS,
                });
            }
            catch (err) {
                const error = err;
                throw error;
            }
        });
    }
}
exports.default = TokenService;
//# sourceMappingURL=token.service.js.map