# Airtabler Development

## Setup

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

