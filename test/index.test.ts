import airtabler from "../src/index"; 

const { baseUrl } = airtabler.init(process.env.DEV_AIRTABLE_BASE_ID!);

describe("init", () => {
  it("returns the object", () => {
    const init = airtabler.init(process.env.DEV_AIRTABLE_BASE_ID!);
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

