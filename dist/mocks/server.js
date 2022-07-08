"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const node_1 = require("msw/node");
const handlers_1 = require("./handlers");
exports.server = (0, node_1.setupServer)(...handlers_1.handlers);
