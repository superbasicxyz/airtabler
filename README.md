# Airtabler

Wrapper for Airtable API written in Typescript. Meant to simplify the implementation of common patterns when using Airtable as a backend for an application.

## Getting started

### Installation

```bash
npm install @superbasic/airtabler

# OR

yarn add @superbasic/airtabler
```

## Initialize

```js

import { airtabler } from "@superbasicxyz/airtabler";

const config = {
  apiKey: "[YOUR-AIRTABLE-API-KEY]",
  baseId: "[YOUR-AIRTABLE-BASE-ID]"
}

const db = airtabler.init(config);
```

## Query Data

### `.model(tableName)`

Instantiate a connection to a particular table in your Airtable base.

Parameters: `tableName`: `string`

Returns `Model` object

```js
const events = db.model('Events');
```

### `.all()`

Retrieve all `Event` records from your Airtable base.

Parameters: none

Returns `AirtableRecord[]`

```js
const allEvents = await events.all();
```

### `.find(recordId)`

Retrieve a single `Event` from your Airtable base.

Parameters: `recordId`: `string`

Returns `AirtableRecord`

```js
const event = await events.find('recXXXXXXXXXXXXXX');
```

## Contributing

Refer to our [contribution guidelines](https://github.com/superbasicxyz/airtabler/blob/main/CONTRIBUTING.md) and [Code of Conduct for contributors](https://github.com/superbasicxyz/airtabler/blob/main/CODE_OF_CONDUCT.md).
