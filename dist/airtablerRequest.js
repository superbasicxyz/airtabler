"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airtablerRequest = void 0;
const axios_1 = __importDefault(require("axios"));
function airtablerRequest(url, { apiKey }) {
    return axios_1.default.get(url, {
        headers: {
            Authorization: apiKey
        }
    });
}
exports.airtablerRequest = airtablerRequest;
