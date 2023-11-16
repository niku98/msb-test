---
title: Module - Localization
---

# {{$frontmatter.title}}

When you generate module, there are two translation files will be included in that module. Like this.

```
locales // Module's translation files.
│ en.json // Module's English translation file.
│ vi.json // Module's Vietnamese translation file.
│ index.ts // Module's merged translation file.
│ types.d.ts // Module's translation typescript declaration file.
```

All translation files will be imported to i18n resources automatically with module's name as namespace.

Typescript is supported. So, when you use `t` function from `react-i18n`, editor will show list of key that you can use for translation.

![Typescript support](/screenshots/i18n-typescript.png)
