# AIRTABLER

Wrapper for Airtable API written in Typescript. Meant to simplify the implementation of common patterns when using Airtable as a backend for an application.

## Dev setup

Install dependencies

```sh
npm install
```

## Run tests

We use `jest` and `ts-jest`

To run your tests:

```sh
npm test # or npm t
```

Or to run with watching:

```sh
npm test -- --watch
```

## Generate docs

Install `typedoc`

```sh
npm i -g typedoc
```

And generate docs

```sh
npx typedoc --out docs src
```

