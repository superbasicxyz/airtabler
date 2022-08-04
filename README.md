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

Parameters: `tableName`: `string`

Returns `Function`

```js
const events = db.model('Events');
```

### `.all()`

Parameters: none

Returns `AirtableRecord[]`

```js
await events.all();
```

### `.find(recordId)`

Parameters: `recordId`: `string`

Returns `AirtableRecord`

```js
const event = await events.find('recXXXXXXXXXXXXXX');
```
