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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecords = void 0;
const airtablerRequest_1 = require("../airtablerRequest");
function getRecords(url, config, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = [];
        const requestUrl = new URL(url);
        if (params === null || params === void 0 ? void 0 : params.offset) {
            requestUrl.searchParams.append("offset", params.offset);
        }
        if (params === null || params === void 0 ? void 0 : params.filterByFormula) {
            requestUrl.searchParams.append("filterByFormula", params.filterByFormula);
        }
        requestUrl.searchParams.append("maxRecords", "1000");
        const response = yield (0, airtablerRequest_1.airtablerRequest)(requestUrl.href, config);
        const { data: { records, offset } } = response;
        records.map((record) => collection.push(record));
        if (offset) {
            const nextRecords = yield getRecords(url, config, { offset });
            nextRecords.map(record => collection.push(record));
        }
        return collection;
    });
}
exports.getRecords = getRecords;
