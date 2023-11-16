---
title: App Instances
---

# App Instances

## I18n Instance

you may access to `i18n` instance via hook `useAppI18n` inside component or function `getAppI18n` outside component.

**Example:**

```ts
// example.service.ts

// use inside component
const i18n = useAppI18n();

// use outside component
const i18n = getAppI18n();

export default function exampleService() {
  message.info(i18n.t("notifications.example"));
}
```

## Router Instance

Like `i18n`, you can access to `router` instance by using hook `useAppRouter` or function `getAppRouter`.

**Example:**

```ts
// example.service.ts

// use inside component
const router = useAppRouter();

// use outside component
const router = getAppRouter();
```
