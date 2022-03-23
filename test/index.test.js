"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const { model, baseUrl } = index_1.default.init(process.env.DEV_AIRTABLE_BASE_ID);
describe("init", () => {
    it("returns the object", () => {
        const init = index_1.default.init(process.env.DEV_AIRTABLE_BASE_ID);
        expect(init).toHaveProperty('baseUrl');
        expect(init).toHaveProperty('model');
    });
});
describe("baseUrl", () => {
    it("returns baseUrl", () => {
        expect(baseUrl()).toBe(`https://api.airtable.com/v0/${process.env.DEV_AIRTABLE_BASE_ID}`);
    });
});
describe("model", () => {
    it("#baseName", () => {
        const events = model("Events");
        expect(events.baseName()).toBe("Events");
    });
    it("#all returns array", () => {
        const events = model("Events");
        expect(events.all()).toStrictEqual([]);
    });
});
