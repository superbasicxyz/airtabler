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
exports.update = void 0;
const airtablerRequest_1 = require("../airtablerRequest");
function update(tableUrl, config) {
    return (params) => __awaiter(this, void 0, void 0, function* () {
        try {
            const recordsToUpdate = Array.isArray(params)
                ? params.map(p => {
                    return {
                        id: p.id,
                        fields: p.fields
                    };
                })
                : [{ id: params.id, fields: params.fields }];
            const response = yield (0, airtablerRequest_1.airtablerRequest)(`${tableUrl}`, config, {
                method: 'patch',
                data: { records: recordsToUpdate }
            });
            const { data: records } = response;
            return records;
        }
        catch (error) {
            return error.response.data;
        }
    });
}
exports.update = update;
