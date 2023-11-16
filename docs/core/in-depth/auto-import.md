---
title: Auto Import Components
---

# {{$frontmatter.title}}

This project support auto-import, with fully typed. You still have code hint, type-checking.

## Internal Components

All components in the folders bellow wil be imported automatically, included typescript declaration.

- `src/modules/common/**/*.tsx`
- `src/modules/core/components` (Exclude components under `pages`)
- `src/layouts`

So, when define new components, make sure that it's name is unique. Then you can use that component without importing.

## Internal Hooks And Utilities

### Hooks

All hooks under the following folders will be import automatically, fully typed.

- `src/modules/<module-name>/hooks`

### Utilities

All utility/helper functions will be imported automatically if they are under these folders:

- `src/modules/<module-name>/utilities`

## Ant Design Components

All Ant Design's components will be imported automatically, without register them as global components, component's style file is also included. To use them, you just need add prefix `Ant` to component name.

**Example**

```tsx
<AntInput />
<AntDatePicker />
```

## Lodash

Almost lodash helper functions are automatically imported when you use it. So, you don't need to import each function when coding. Don't forget adding prefix `_` to function you need to use.

**Example**

```ts
_get();
_set();
_map();
```

## RxJs

Almost RxJs functions are automatically imported when you use it. So, you don't need to import each function when coding. Don't forget adding prefix `rx` to function you need to use.

**Example**

```ts
rxGet();
rxMap();
rxMapTo();
```
