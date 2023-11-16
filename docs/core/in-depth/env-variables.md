---
title: Environment Variables
---

# Environment Variables

**ReactJs Core** support read variables from `.env` file, with three mode corresponds with files:

- Development: `.env.development`
- Staging: `.env.staging`
- Production: `.env.production`

## Env File Structure

Each line in `.env` file is a variable, with `<VARIABLE_NAME>=value_you_want` structure.

**Example:**

```
VITE_APP_NAME=ReactJs Core
```

## Define Variable

To define new environment variable, put a newline to `.env` with variable name start with `VITE_` . in **SNAKE_UPPERCASE**.

**Example:**

```
VITE_APP_NAME=ReactJs Core
```

This variable will automatically add to interface `ENV` with it's name without `VITE_` and in `snakeCase`.

**Example:** The variable above will look like this in `ENV`

```ts
// env.d.ts

interface ENV {
  appName: string;
}
```

### Type Casting

You can define environment variable with three types: `string`(default), `number`, `boolean` and `(string | number)[]`. Then, that variable will be cast to the type you use for variable's value.

**Example:**

```sh
# .env

VITE_APP_NAME=ReactJs Core
VITE_PAGE_SIZE=10
VITE_NEED_SYNC=false
VITE_ARRAY_EXAMPLE=[123, 456, abc, def]
```

Three variables above will be typed like this.

```ts
// env.d.ts

interface ENV {
  appName: string;
  pageSize: number;
  needSync: boolean;
  arrayExample: (number | string)[]
}
```

## Using

You can access to environment variables by import from "app-env".

**Example:**

```ts
// example.service.ts
import appEnv from "app-env";

// Then
appEnv.appName;
```
