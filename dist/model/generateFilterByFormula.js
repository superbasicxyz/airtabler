"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilterByFormula = void 0;
function generateFilterByFormula(params) {
    let formula = "";
    if (typeof params.id == "string") {
        formula += `SEARCH(RECORD_ID(), "${params.id}")`;
    }
    if (Array.isArray(params.id)) {
        formula += `SEARCH(RECORD_ID(), "${params.id.join(",")}")`;
    }
    const fields = Object.keys(params);
    fields.forEach(field => {
        if (field == "id") {
            return;
        }
        formula += `SEARCH("${params[field]}", {${field}})`;
    });
    return { filterByFormula: formula };
}
exports.generateFilterByFormula = generateFilterByFormula;
