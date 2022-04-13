import { rest } from "msw";

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

export const handlers = [
  rest.get(`${BASE_URL}/Events`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        records: [EVENT],
        offset: "itr4123jkflsf/recUhjklsdfukjs"
      })
    );
  }),
  rest.get(`${BASE_URL}/Event`, (_, res, ctx) => {
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
  rest.get(`${BASE_URL}/Events/${EVENT.id}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(EVENT));
  }),
  rest.get(`${BASE_URL}/Events/*`, (_, res, ctx) => {
    return res(ctx.status(404), ctx.json({ error: "NOT_FOUND" }));
  }),
  rest.post(`${BASE_URL}/*`, (_, res, ctx) => {
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
