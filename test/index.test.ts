import airtabler from "../src/index"; 

const config = {
  baseId: process.env.DEV_AIRTABLE_BASE_ID!,
  apiKey: process.env.DEV_AIRTABLE_API_KEY!
}

const { baseUrl } = airtabler.init(config);

describe("init", () => {
  it("returns the object", () => {
    const init = airtabler.init(config);
    expect(init).toHaveProperty('baseUrl');
    expect(init).toHaveProperty('model');
  });
});

describe("baseUrl", () => {
  it("returns baseUrl", () => {
    expect(baseUrl()).toBe(
      `https://api.airtable.com/v0/${process.env.DEV_AIRTABLE_BASE_ID!}`
    );
  });
});

