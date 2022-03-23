"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBase64ToBlob = exports.generateUUID = void 0;
const uuid_1 = require("uuid");
const generateUUID = () => (0, uuid_1.v4)();
exports.generateUUID = generateUUID;
const convertBase64ToBlob = (fileBase64) => {
    try {
        const splitDataURI = fileBase64.split(',');
        const byteString = splitDataURI[0].indexOf('base64') >= 0
            ? Buffer.from(splitDataURI[1], 'base64').toString()
            : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }
    catch (err) {
        console.error(err);
        throw new Error('error in converting base64 to Blob');
    }
};
exports.convertBase64ToBlob = convertBase64ToBlob;
//# sourceMappingURL=helper.js.map