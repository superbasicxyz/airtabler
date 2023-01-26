import { airtabler } from "../src/index";
import { AirtableBase, AirtablerConfig } from "../types";

const config: AirtablerConfig = {
    baseId: process.env.DEV_AIRTABLE_BASE_ID!,
    personalAccessToken: process.env.DEV_AIRTABLE_TOKEN!
};

const { schema } = airtabler.init(config);

describe("schema()", () => {
    describe(".list()", () => {
        it("returns an array of bases", async () => {
            const bases = await schema().list();
            const expectedBases: AirtableBase[] = [
                {
                    "id": "appPknPmgGEJmXAuy",
                    "name": "Untitled Base",
                    "permissionLevel": "read"
                }
            ]
            expect(bases).toEqual(expectedBases)
        })
    })
});