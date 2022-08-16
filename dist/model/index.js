"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const baseUrl_1 = require("../baseUrl");
const all_1 = require("./all");
const find_1 = require("./find");
const where_1 = require("./where");
const destroy_1 = require("./destroy");
const create_1 = require("./create");
function model(config) {
    return (tableName) => {
        const tableUrl = new URL(`${(0, baseUrl_1.baseUrl)(config.baseId)}/${tableName}`);
        return {
            tableName: () => tableName,
            tableUrl: () => tableUrl,
            all: (0, all_1.all)(tableUrl, config),
            find: (0, find_1.find)(tableUrl, config),
            where: (0, where_1.where)(tableUrl, config),
            destroy: (0, destroy_1.destroy)(tableUrl, config),
            create: (0, create_1.create)(tableUrl, config)
        };
    };
}
exports.model = model;
