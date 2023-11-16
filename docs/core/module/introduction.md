---
title: Module - Introduction
---

# {{$frontmatter.title}}

We will separate app to several modules. Each modules have their own responsibility, providing one feature.

## I. Command line

This command line will be used to generate new module, in folder `src/modules/<module-name>`. Example:

```sh
yarn gen-module <module-name> <layout-name>
```

Replace `<module-name>` with your module name and `<layout-name>` with layout name will be used for that module.
::: tip READ MORE
Read more about [**Layout**](/core/in-depth/layout).
:::

## II. Structure

A module has two folders you need to know first before do anything else:

- [Module's routing](/core/module/routing)
- [Module's localization](/core/module/localization)

Module's routes and localization will be imported automatically.

A module is structured like this:

```
module_1 // Module 1.
└─components // Module's business/local components.
└─models // Module's business resources typing.
└─repositories // Module's definition resources api calling.
└─styles // Module's local styles.
└─utilities // Module's local business logic functions.
│
└─locales // Module's translation files.
│ │ en.json // Module's English translation file.
│ │ vi.json // Module's Vietnamese translation file.
│ │ index.ts // Module's merged translation file.
│ │ preload_en.json // Module's English preload translation file.
│ │ preload_vi.json // Module's Vietnamese preload translation file.
│ │ preload.ts // Module's merged preload translation file.
│ │ types.d.ts // Module's translation typescript declaration file.
│
└─pages // Module's pages.
│ └─index.tsx // Module's index page.
│ └─child.tsx // Module's child page.
│
│ index.ts // Module's export features.
```
