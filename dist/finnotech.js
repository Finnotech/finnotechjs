"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("./common/http"));
const oak_service_1 = __importDefault(require("./services/oak/oak.service"));
const token_service_1 = __importDefault(require("./services/token/token.service"));
class Finnotech {
    /**
     * @param config basic information for api call. To get this info, go to [Finnotech Console](https://console.finnotech.ir) and then paste them here
     */
    constructor(config) {
        this._clientId = config.clientId;
        this._clientSecret = config.clientSecret;
        this._nid = config.nid;
        this._getAccessToken = config.getAccessToken;
        this._getRefreshToken = config.getRefreshToken;
        this._setTokens = config.setTokens;
        this._useSandBox = config.useSandBox ? true : false;
        // due to httpService need to initiate TokenService again for refresh functionalities
        const tokenServiceInitialData = {
            clientId: this._clientId,
            clientSecret: this._clientSecret,
            nid: this._nid,
            getAccessTokenFunction: this._getAccessToken,
            getRefreshTokenFunction: this._getRefreshToken,
            setTokensFunction: this._setTokens,
        };
        const httpService = (0, http_1.default)({ useSandBox: this._useSandBox }, tokenServiceInitialData);
        this.TokenService = new token_service_1.default(tokenServiceInitialData, httpService);
        this.OakService = new oak_service_1.default(this.TokenService, httpService);
    }
}
exports.default = Finnotech;
//# sourceMappingURL=finnotech.js.map