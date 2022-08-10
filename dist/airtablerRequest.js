"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airtablerRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const defaultOptions = {
    method: "get"
};
function airtablerRequest(url, { apiKey }, { method } = defaultOptions) {
    return (0, axios_1.default)({
        method,
        url,
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });
}
exports.airtablerRequest = airtablerRequest;
