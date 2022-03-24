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

  describe(".all()", () => {
    const events = model("Events");
    expect(events.all()).toStrictEqual([]);
  });

  describe(".find()", () => {});
});
