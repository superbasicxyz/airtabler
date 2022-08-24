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
function airtablerRequest(url, { apiKey }, options) {
    const method = options ? options.method : defaultOptions.method;
    const data = (options === null || options === void 0 ? void 0 : options.data) ? options.data : null;
    const requestConfig = {
        method,
        url,
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    };
    if ((method == "post" || method == "patch") && data) {
        requestConfig.headers["Content-Type"] = "application/json";
        requestConfig.data = data;
    }
    return (0, axios_1.default)(requestConfig);
}
exports.airtablerRequest = airtablerRequest;
