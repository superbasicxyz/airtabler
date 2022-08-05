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
exports.model = void 0;
const baseUrl_1 = require("./baseUrl");
const airtablerRequest_1 = require("./airtablerRequest");
function all(tableUrl, config) {
    function getRecords(url, config, offsetParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = [];
            const requestUrl = new URL(url);
            if (offsetParam) {
                requestUrl.searchParams.append("offset", offsetParam);
            }
            requestUrl.searchParams.append("maxRecords", "1000");
            const response = yield (0, airtablerRequest_1.airtablerRequest)(requestUrl.href, config);
            const { data: { records, offset } } = response;
            records.map((record) => collection.push(record));
            if (offset) {
                const nextRecords = yield getRecords(url, config, offset);
                nextRecords.map(record => collection.push(record));
            }
            return collection;
        });
    }
    return () => __awaiter(this, void 0, void 0, function* () {
        try {
            const records = yield getRecords(tableUrl, config);
            return records;
        }
        catch (error) {
            return error.response.data;
        }
    });
}
function find(tableUrl, config) {
    return (recordId) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, airtablerRequest_1.airtablerRequest)(`${tableUrl}/${recordId}`, config);
            const { data: record } = response;
            return record;
        }
        catch (error) {
            return error.response.data;
        }
    });
}
function model(config) {
    return (tableName) => {
        const tableUrl = new URL(`${(0, baseUrl_1.baseUrl)(config.baseId)}/${tableName}`);
        return {
            tableName: () => tableName,
            tableUrl: () => tableUrl,
            all: all(tableUrl, config),
            find: find(tableUrl, config)
        };
    };
}
exports.model = model;
