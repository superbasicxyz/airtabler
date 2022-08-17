# Welcome!

To get you started quickly, we've created an overview of the most important things to get you started contributing code to Airtabler. As well as a [Code of Conduct](https://github.com/superbasicxyz/airtabler/blob/master/CODE_OF_CONDUCT.md) for contributing to the development of Airtabler.

We also encourage you to join our [community](https://fullstackdfw.com) online, where you can discuss ideas, ask questions, and get inspiration for what to build next.

## Airtabler Development

### Prerequisites

- Node >= 16

### Setup

Clone repository

```sh
git clone git@github.com:superbasicxyz/airtabler.git && cd airtabler
```

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
npx typedoc --entryPointStrategy expand ./src
```

