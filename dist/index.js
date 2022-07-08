"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const airtabler = {
    init: (config) => {
        return {
            model: (0, model_1.model)(config)
        };
    }
};
exports.default = airtabler;
