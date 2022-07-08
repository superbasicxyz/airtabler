import { airtablerRequest } from "../src/airtablerRequest";
import { baseUrl } from "../src/baseUrl";

import { AirtablerConfig } from "../src/types.d";

const config: AirtablerConfig = {
  apiKey: process.env.DEV_AIRTABLE_API_KEY!,
  baseId: process.env.DEV_AIRTABLE_BASE_ID!
}

describe("airtablerRequest", () => {
  test("returns a preconfigured axios request", async () => {
    const request = await airtablerRequest(`${baseUrl(config.baseId)}/Events`, config);
    expect(request.config.headers!.Authorization).toBe(`Bearer ${config.apiKey}`);
  });
});
