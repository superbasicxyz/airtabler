"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = void 0;
function baseUrl(baseId) {
    const url = new URL(`https://api.airtable.com/v0/${baseId}`);
    return url;
}
exports.baseUrl = baseUrl;
