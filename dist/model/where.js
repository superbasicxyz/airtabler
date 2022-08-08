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
exports.where = void 0;
const generateFilterByFormula_1 = require("./generateFilterByFormula");
const getRecords_1 = require("./getRecords");
function where(tableUrl, config) {
    return (params) => __awaiter(this, void 0, void 0, function* () {
        try {
            const airtableRequestParams = (0, generateFilterByFormula_1.generateFilterByFormula)(params);
            const records = yield (0, getRecords_1.getRecords)(tableUrl, config, airtableRequestParams);
            return records;
        }
        catch (error) {
            return error.response.data;
        }
    });
}
exports.where = where;
