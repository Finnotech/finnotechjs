"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'https://apibeta.finnotech.ir';
const SAND_BOX_BASE_URL = 'https://sandboxapi.finnotech.ir';
exports.default = (options) => {
    const customAxios = axios_1.default.create({
        baseURL: options.useSandBox ? SAND_BOX_BASE_URL : BASE_URL,
    });
    return customAxios;
};
//# sourceMappingURL=http.js.map