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
const axios_1 = __importDefault(require("axios"));
const token_service_1 = __importDefault(require("../services/token/token.service"));
const helper_1 = require("./helper");
const BASE_URL = 'https://apibeta.finnotech.ir';
const SAND_BOX_BASE_URL = 'https://sandboxapi.finnotech.ir';
exports.default = (options, tokenServiceInitialData) => {
    const customAxios = axios_1.default.create({
        baseURL: options.useSandBox ? SAND_BOX_BASE_URL : BASE_URL,
    });
    const internalTokenService = new token_service_1.default(tokenServiceInitialData, customAxios);
    // refresh token process
    customAxios.interceptors.response.use((response) => response, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        if (((_c = (_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.code) !== 'VALIDATION_ERROR' ||
            ((_f = (_e = (_d = err.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.message) !== 'invalid token') {
            return err;
        }
        const headers = err.config.headers;
        // @ts-ignore
        const scopeName = headers['X-Scope-Name'];
        if (!scopeName) {
            return err;
        }
        try {
            yield internalTokenService.getClientCredentialsRefreshToken(scopeName);
            const newToken = yield internalTokenService.getAccessToken(scopeName);
            const newConfig = Object.assign(Object.assign({}, err.config), { headers: Object.assign(Object.assign({}, err.config.headers), { Authorization: `Bearer ${newToken}` }), params: Object.assign(Object.assign({}, err.config.params), { trackId: 'R-' + (0, helper_1.generateUUID)() }) });
            return (0, axios_1.default)(newConfig);
        }
        catch (error) {
            return Promise.reject(err);
        }
    }));
    return customAxios;
};
//# sourceMappingURL=http.js.map