import airtabler from "../src/index";

const config = {
  baseId: process.env.DEV_AIRTABLE_BASE_ID!,
  apiKey: process.env.DEV_AIRTABLE_API_KEY!
}

const { model, baseUrl } = airtabler.init(config);

describe("all()", () => {
  it("returns a function", () => {});
});

describe("find()", () => {
  it("returns a function", () => {});
});

describe("model()", () => {
  describe(".tableName()", () => {
    it("returns the table name", () => {
      const events = model("Events");
      expect(events.tableName()).toBe("Events");
    });
  });

  describe(".tableUrl()", () => {
    it("returns the table URL", () => {
      const events = model("Events");
      expect(events.tableUrl()).toBe(`${baseUrl()}/Events`);
    });
  });

  describe(".all", () => {
    test(".all()", async () => {
      const events = model("Events");
      await expect(events.all()).resolves.toStrictEqual([
        {
          id: "rec9HHwhi5F8Fy997",
          createdTime: "2022-01-03T21:12:51.000Z",
          fields: {
            notes: "this is a note",
            email: "test@airtable.com",
            events: ["rec4hh123543jJkkl"]
          }
        }
      ]);
    });
    test(".all() on bad table name", async () => {
      const events = model("Event");
      await expect(events.all()).resolves.toStrictEqual({
        error: {
          type: "TABLE_NOT_FOUND",
          message: `Could not find table Event in application ${process.env.DEV_AIRTABLE_BASE_ID}`
        }
      });
    });
  });

  describe(".find", () => {
    test(".find(id) finds something", async () => {
      const events = model("Events");
      await expect(events.find("rec9HHwhi5F8Fy997")).resolves.toStrictEqual({
        id: "rec9HHwhi5F8Fy997",
        createdTime: "2022-01-03T21:12:51.000Z",
        fields: {
          notes: "this is a note",
          email: "test@airtable.com",
          events: ["rec4hh123543jJkkl"]
        }
      });
    });

    test(".find(incorrectid) handles record not found gracefully", async () => {
      const events = model("Events");

      await expect(events.find("rec9HHwhi5F8Fy9")).resolves.toStrictEqual({
        error: "NOT_FOUND"
      });
    });
  });
});
