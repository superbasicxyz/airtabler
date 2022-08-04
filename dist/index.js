"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airtabler = void 0;
const model_1 = require("./model");
const airtabler = {
    init: (config) => {
        return {
            model: (0, model_1.model)(config)
        };
    }
};
exports.airtabler = airtabler;
