import { rest, RestRequest } from "msw";

const responses = require("./responses.json");

const BASE_URL = `https://api.airtable.com/v0/${process.env.DEV_AIRTABLE_BASE_ID}`;

const EVENT = {
  id: "rec9HHwhi5F8Fy997",
  createdTime: "2022-01-03T21:12:51.000Z",
  fields: {
    notes: "this is a note",
    email: "test@airtable.com",
    events: ["rec4hh123543jJkkl"]
  }
};

const unauthorizedResponse = {
  error: {
    type: "AUTHENTICATION_REQUIRED",
    message: "Authentication required"
  }
};

const isAuthorized = (req: RestRequest): boolean => {
  return (
    req.headers.get("Authorization") ==
    `Bearer ${process.env.DEV_AIRTABLE_API_KEY}`
  );
};

export const handlers = [
  rest.get(`${BASE_URL}/Events`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401), ctx.json(unauthorizedResponse));
    }

    if (
      req.url.searchParams.get("filterByFormula") ==
      'SEARCH(RECORD_ID(), "recEeoflM87HKIsOf")'
    ) {
      return res(
        ctx.json({ records: responses.events.whereIdSingle[0].records })
      );
    }

    if (
      req.url.searchParams.get("filterByFormula") ==
      'SEARCH(RECORD_ID(), "recEeoflM87HKIsOf,rec0yEne3iWggETaA")'
    ) {
      return res(
        ctx.json({ records: responses.events.whereIdSingle[0].records })
      );
    }

    if (
      req.url.searchParams.get("filterByFormula") ==
      'SEARCH("Retirement", {Name})'
    ) {
      return res(ctx.json({ records: responses.events.whereName[0].records }));
    }

    if (req.url.searchParams.get("offset")) {
      return res(
        ctx.status(200),
        ctx.json({
          records: responses.events.index[1].records
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        records: responses.events.index[0].records,
        offset: responses.events.index[0].offset
      })
    );
  }),
  rest.get(`${BASE_URL}/Event`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401), ctx.json(unauthorizedResponse));
    }

    return res(
      ctx.status(404),
      ctx.json({
        error: {
          type: "TABLE_NOT_FOUND",
          message: `Could not find table Event in application ${process.env.DEV_AIRTABLE_BASE_ID}`
        }
      })
    );
  }),
  rest.get(`${BASE_URL}/Events/${EVENT.id}`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401), ctx.json(unauthorizedResponse));
    }
    return res(ctx.status(200), ctx.json(EVENT));
  }),
  rest.get(`${BASE_URL}/Events/*`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401), ctx.json(unauthorizedResponse));
    }

    return res(ctx.status(404), ctx.json({ error: "NOT_FOUND" }));
  }),
  rest.delete(`${BASE_URL}/Events`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401), ctx.json(unauthorizedResponse));
    }

    if (req.url.searchParams.getAll("records[]")[0] == "recEeoflM87HKIsOf") {
      return res(ctx.status(200), ctx.json(responses.events.deleteSingle[0]));
    }

    if (
      req.url.searchParams.getAll("records[]").join() ==
      "recJScKqCWaHpgyT6,recgJYM1juGmJfX3g"
    ) {
      return res(ctx.status(200), ctx.json(responses.events.deleteMultiple[0]));
    }

    return res(ctx.status(404), ctx.json({ error: "NOT_FOUND" }));
  }),
  rest.post(`${BASE_URL}/*`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(401), ctx.json(unauthorizedResponse));
    }

    return res(
      ctx.status(201),
      ctx.json({
        records: [
          {
            id: "rec9HHwhi5F8Fy997",
            createdTime: "2022-01-03T21:12:51.000Z",
            fields: {
              notes: "this is a note",
              email: "test@airtable.com",
              events: ["rec4hh123543jJkkl"]
            }
          }
        ]
      })
    );
  })
];
