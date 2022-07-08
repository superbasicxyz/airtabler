"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./mocks/server");
beforeAll(() => server_1.server.listen());
afterEach(() => server_1.server.resetHandlers());
afterAll(() => server_1.server.close());
