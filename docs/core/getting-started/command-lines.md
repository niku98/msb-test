---
title: Command lines
---

# {{$frontmatter.title}}

These are all the command lines in this project.

## 1. Install project dependencies.

You need to install all project dependencies. So, the command line bellow will install all for you.

```sh
yarn
```

## 2. Start developing

To run develop environment, you need to run:

```sh
yarn dev
```

## 3. Run unit tests

To run unit tests, you should use:

```sh
yarn test
```

## 4. Build production

You can build production to several environments.

### Development

```sh
yarn build:development
```

### Staging

```sh
yarn build:staging
```

### Production

```sh
yarn build:production
```

## 5. Generate module

This command line will be used to generate new module, in folder `src/modules/<module-name>`. Example:

```sh
yarn gen-module <module-name>
```

Replace `<module-name>` with your module name.
