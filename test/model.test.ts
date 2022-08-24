import { airtabler } from "../src/index";

import { baseUrl } from "../src/baseUrl";

const responses = require("../src/mocks/responses.json");

const config = {
  baseId: process.env.DEV_AIRTABLE_BASE_ID!,
  apiKey: process.env.DEV_AIRTABLE_API_KEY!
};

const { model } = airtabler.init(config);

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
      expect(`${events.tableUrl()}`).toBe(`${baseUrl(config.baseId)}/Events`);
    });
  });

  describe(".all", () => {
    test(".all()", async () => {
      const events = await model("Events").all();

      expect(events.length).toStrictEqual(
        responses.events.index.flatMap((page: any) => page.records).length
      );
      expect(events).toStrictEqual(
        responses.events.index.flatMap((page: any) => page.records)
      );
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

  describe(".where", () => {
    test('.where({ id: "id"}) returns an array with one record', async () => {
      const events = model("Events");
      await expect(
        events.where({ id: "recEeoflM87HKIsOf" })
      ).resolves.toStrictEqual(responses.events.whereIdSingle[0].records);
    });

    test('.where({ id: ["id", "id"]}) returns an array with one record', async () => {
      const events = model("Events");
      await expect(
        events.where({ id: ["recEeoflM87HKIsOf", "rec0yEne3iWggETaA"] })
      ).resolves.toStrictEqual(responses.events.whereIdSingle[0].records);
    });

    test('.where({ Name: "Retirement"} returns an array with correct records', async () => {
      const events = model("Events");
      await expect(events.where({ Name: "Retirement" })).resolves.toStrictEqual(
        responses.events.whereName[0].records
      );
    });
  });

  describe(".destroy", () => {
    test('.destroy("recXXXXXX") returns deleted records', async () => {
      const events = model("Events");

      await expect(events.destroy("recEeoflM87HKIsOf")).resolves.toStrictEqual(
        responses.events.deleteSingle[0]
      );
    });

    test('.destroy(["recXXXXXX", "recYYYY"]) returns deleted records', async () => {
      const events = model("Events");

      await expect(
        events.destroy(["recJScKqCWaHpgyT6", "recgJYM1juGmJfX3g"])
      ).resolves.toStrictEqual(responses.events.deleteMultiple[0]);
    });
  });

  describe(".create", () => {
    test("create({fields}) creates a record", async () => {
      const events = model("Events");

      await expect(
        events.create(responses.events.createSingle[0].records[0].fields)
      ).resolves.toStrictEqual(responses.events.createSingle[0]);
    });
    test("create([{fields}]) creates a record", async () => {
      const events = model("Events");

      await expect(
        events.create(
          responses.events.createMultiple[0].records.map((r: any) => r.fields)
        )
      ).resolves.toStrictEqual(responses.events.createMultiple[0]);
    });
  });

  describe(".update", () => {
    test(".update({id, fields}) updates record", async () => {
      const events = model("Events");

      await expect(
        events.update({ id: "recXXXXXXXX", fields: { name: "Updated Event" } })
      ).resolves.toStrictEqual(responses.events.update);
    });
  });
});
