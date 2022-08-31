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
function airtablerRequest(url, { apiKey }, { method, data } = defaultOptions) {
    const requestConfig = {
        method,
        url,
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    };
    switch (method) {
        case "get":
            return airtablerGetRequest(requestConfig);
            break;
        case "post":
            return airtablerPostRequest(requestConfig, data);
            break;
        case "patch":
            return airtablerPatchRequest(requestConfig, data);
            break;
        case "delete":
            return airtablerDeleteRequest(requestConfig);
            break;
        default:
            console.error(`unsupported request method: ${method}`);
            break;
    }
    return (0, axios_1.default)(requestConfig);
}
exports.airtablerRequest = airtablerRequest;
function airtablerGetRequest(requestConfig) {
    return (0, axios_1.default)(requestConfig);
}
function airtablerPostRequest(requestConfig, data) {
    return (0, axios_1.default)(Object.assign(Object.assign({}, requestConfig), { headers: Object.assign(Object.assign({}, requestConfig.headers), { "Content-Type": "application/json" }), data }));
}
// the functions below take the same arguments and handle the request the same way
// we'll put them in as aliases for now. if we need to break them out with their own
// logic we can easily do so later
const airtablerPatchRequest = airtablerPostRequest;
const airtablerDeleteRequest = airtablerGetRequest;
