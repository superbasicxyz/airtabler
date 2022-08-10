# Airtabler

Airtable API client written in Typescript. Airtabler's aim is to simplify the implementation of common patterns when using Airtable as a backend for an application.

## Getting started

### Installation

```bash
npm install @superbasicxyz/airtabler

# OR

yarn add @superbasicxyz/airtabler
```

## Initialize

```js
import { airtabler } from "@superbasicxyz/airtabler";

const config = {
  apiKey: "[YOUR-AIRTABLE-API-KEY]",
  baseId: "[YOUR-AIRTABLE-BASE-ID]"
};

const db = airtabler.init(config);
```

## Instantiate a `Model` object

### `.model(tableName)`

Instantiate a connection to a particular table in your Airtable base.

Parameters: `tableName`: `string` _Required_

Returns `Model` object

```js
const events = db.model("Events");
```

## Query data using the `Model` object

### `.all()`

Retrieve all `Event` records from your Airtable base.

Parameters: none

Returns `AirtableRecord[]`

```js
const allEvents = await events.all();

/*
[
  {
    id: "recXXXXXXXXXXXXX",
    createdTime: "2022-07-19T22:41:33.000Z",
    fields: { name: "Birthday Party", id: "recXXXXXXXXXXXXXX" }
  },
  {
    id: "recXXXXXXXXXXXXX",
    createdTime: "2022-07-19T22:41:33.000Z",
    fields: { name: "Graduation Party", id: "recXXXXXXXXXXXXXXX" }
  },
  {
    id: "recXXXXXXXXXXXXX",
    createdTime: "2022-07-19T22:41:33.000Z",
    fields: { name: "Wedding Reception", id: "recXXXXXXXXXXXXXX" }
  }
]
*/
```

### `.find(recordId)`

Retrieve a single `Event` from your Airtable base.

Parameters: `recordId`: `string` _Required_

Returns `AirtableRecord`

```js
const event = await events.find("recXXXXXXXXXXXXXX");

/*
{
  id: "recXXXXXXXXXXXXX",
  createdTime: "2022-07-19T22:41:38.000Z",
  fields: { name: "Birthday Party", id: "recXXXXXXXXXXXX" }
}
*/
```

### `.where(params)` (in progress)

Retrieve a collection of `Event`s that match criteria defined in params.

The keys of the parameter object are the names of the column in your Airtable base.

Parameters: `params`: `Record<string, string | string[]>` _Required_

Returns `AirtableRecord[]`

```js
const graduationParties = await events.where({ name: "Graduation Party" });

/*
[
  {
    id: "recgJYM1juGmJfX3g",
    createdTime: "2022-04-29T20:05:09.000Z",
    fields: { Name: "Graduation Party", id: "recgJYM1juGmJfX3g" }
  },
  {
    id: "reczoSVcf1htzZymV",
    createdTime: "2022-04-29T20:05:09.000Z",
    fields: { Name: "Graduation Party", id: "reczoSVcf1htzZymV" }
  }
]
*/
```

You can pass an array of `id`s to the `where` function to select multiple records by their `id`. This
is especially helpful when working with relationships between tables, as the Airtable API returns these columns
as an...array of `id`s.

```js
const event = await events.find("recXXXXXXXXXX"); // { ...Dogs: ["recXXXXXXXX", "recYYYYYYYY"] ... }
const dogs = db.model("Dogs");
const partyDogs = await dogs.where({ id: event.fields.Dogs });

/*
[
  {
    id: "recXXXXXXXXXX",
    createdTime: "2022-04-29T20:05:09.000Z",
    fields: { Name: "Doggo" }
  },
  {
    id: "recYYYYYYYYYY",
    createdTime: "2022-04-29T20:05:09.000Z",
    fields: { Name: "Grapes" }
  }
  {
]
```

### `.destroy(recordId)` or `.destroy([recordIds])`

Delete single record by its `id` or up to 10 records by passing an array of `id`s. The 10 records limit is a restriction of the Airtable API.

Parameters: `recordIds`: `string | string[]` _Required_

Returns `AirtableRecord[]` (kind of)

```js
events.destroy("recYYYYYYYYY");

# OR

events.destroy(["recYYYYYYYYYYYY", "recZZZZZZZZZZZ"]);


/*
[
  { id: "recYYYYYYYYYY", deleted: true },
  { id: "recZZZZZZZZZZ", deleted: true }
]
```

### `.tableName()`

Parameters: none

Returns `string`

```js
const tableName = events.tableName();

// "Events"
```

### `.tableUrl()`

Parameters: none

Returns `string`

```js
const tableUrl = events.tableUrl();

// "https://api.airtable.com/v0/appXXXXXXXXXX/Events"
```

## Contributing

Refer to our [contribution guidelines](https://github.com/superbasicxyz/airtabler/blob/main/CONTRIBUTING.md) and [Code of Conduct for contributors](https://github.com/superbasicxyz/airtabler/blob/main/CODE_OF_CONDUCT.md).
