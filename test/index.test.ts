import { airtabler } from "../src/index"; 

const config = {
  baseId: process.env.DEV_AIRTABLE_BASE_ID!,
  apiKey: process.env.DEV_AIRTABLE_API_KEY!
}

describe("init", () => {
  it("returns the object", () => {
    const init = airtabler.init(config);
    expect(init).toHaveProperty('model');
    expect(init).toHaveProperty('schema');
  });
});

