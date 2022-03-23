import airtabler from "../src/index"; 

const { model } = airtabler.init(process.env.DEV_AIRTABLE_BASE_ID!);

describe('#all', () => {
  it('returns a function', () => {

  });
});

describe('#find', () => {
  it('returns a function', () => {

  });
});

describe("model", () => {
  it("#baseName", () => {
    const events = model("Events");
    expect(events.tableName()).toBe("Events");
  });

  it("#all returns array", () => {
    const events = model("Events");
    expect(events.all()).toStrictEqual([]);
  });
});

