# Airtabler

Airtable API client written in Typescript. Airtabler's aim is to simplify the implementation of common patterns when using Airtable as a backend for an application.


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

/*
[
  {
    id: 'recXXXXXXXXXXXXX',
    createdTime: '2022-07-19T22:41:33.000Z',
    fields: { name: 'Birthday Party', id: 'recAXS51sA0oAlc13' }
  },
  {
    id: 'recXXXXXXXXXXXXX',
    createdTime: '2022-07-19T22:41:33.000Z',
    fields: { name: 'Graduation Party', id: 'recAXS51sA0oAlc13' }
  },
  {
    id: 'recXXXXXXXXXXXXX',
    createdTime: '2022-07-19T22:41:33.000Z',
    fields: { name: 'Wedding Reception', id: 'recAXS51sA0oAlc13' }
  }
]
*/
```

### `.find(recordId)`

Retrieve a single `Event` from your Airtable base.

Parameters: `recordId`: `string`

Returns `AirtableRecord`

```js
const event = await events.find('recXXXXXXXXXXXXXX');

/*
{
  id: 'rec0DvbU00rjSVu1V',
  createdTime: '2022-07-19T22:41:38.000Z',
  fields: { name: 'Birthday Party', id: 'rec0DvbU00rjSVu1V' }
}
*/

```

### `.tableName()`

Parameters: none

Returns `string`

```js
const tableName = events.tableName()

// "Events"
```

### `.tableUrl()`

Parameters: none

Returns `string`

```js
const tableUrl = events.tableUrl()

// https://api.airtable.com/v0/appXXXXXXXXXX/Events
```

## Contributing

Refer to our [contribution guidelines](https://github.com/superbasicxyz/airtabler/blob/main/CONTRIBUTING.md) and [Code of Conduct for contributors](https://github.com/superbasicxyz/airtabler/blob/main/CODE_OF_CONDUCT.md).
