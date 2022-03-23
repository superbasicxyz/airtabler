import { baseUrl } from "../src/baseUrl";

describe("baseUrl", () => {
  it("returns baseUrl", () => {
    expect(baseUrl(process.env.DEV_AIRTABLE_BASE_ID!)).toBe(
      `https://api.airtable.com/v0/${process.env.DEV_AIRTABLE_BASE_ID!}`
    );
  });
});
