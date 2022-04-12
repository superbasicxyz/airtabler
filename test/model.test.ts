import airtabler from "../src/index";

const { model, baseUrl } = airtabler.init(process.env.DEV_AIRTABLE_BASE_ID!);

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

  describe(".find()", () => {});
});
