import { airtablerRequest } from "../src/airtablerRequest";
import { baseUrl } from "../src/baseUrl";

import { AirtablerConfig } from "../types.d";

const config: AirtablerConfig = {
  personalAccessToken: process.env.DEV_AIRTABLE_TOKEN!,
  baseId: process.env.DEV_AIRTABLE_BASE_ID!
}

describe("airtablerRequest", () => {
  test("returns a preconfigured axios request", async () => {
    const request = await airtablerRequest(`${baseUrl(config.baseId)}/Events`, config);
    expect(request.config.headers!.Authorization).toBe(`Bearer ${config.personalAccessToken}`);
  });
});
