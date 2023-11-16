---
title: Conventions
---

# {{$frontmatter.title}}

This project has some code conventions you have to follow. And, most of all will be formatted with VsCode automatically.

## 1. Indent

- **Type**: space
- **Size**: 2

## 2. Variable naming

- **Variable name** should follow format **_camelCase_**.
- **Function name** should follow format **_camelCase_**.
- **Class name** should follow format **_PascalCase_**.

## 3. Define component

- **Component name** should follow format **_PascalCase_**.
- Should use **Function component** every time.
- If component has children component, you need to follow requirement bellow:
  - **_Folder name_** **is** _component name_.
  - Root component will be inside file `index.tsx`.
  - Other children component will be placed in this folder too.

## 4. JSX

### a. Props

If Element has multiple props or prop too long, you should break to multiple lines.

Example:

```jsx
<Field
  component={CheckboxGroupField}
  options={[
    {
      value: "1",
      label: "ABC",
    },
    {
      value: "aabc",
      label: "ABCD",
    },
    {
      value: "abec",
      label: "ABC 1",
    },
  ]}
  name="abc"
  type="group"
  circle
/>
```

### b. Children

- If Element doesn't have children element, you have to use self closing tag.

  Example: `<Image />`.

- Children have to be more 1 indent than Parent. Example:
  ```jsx
  <div>
    <span>just a text</span>
  </div>
  ```
