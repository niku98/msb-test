---
title: Layout
---

# Layout

**ReactJs Core** has a layout system. Which provide you a way to have several layouts in your app. In each route, you can use any layout you want.

## Define Layout

To define new layout, just create a component under folder `src/layouts`. Example: `Dashboard.tsx`.

### Layout Elements

If your layout is too large and you want to split it to some children component. Make sure all their name end with `Element.tsx`. Example: `DashboardHeaderElement.tsx`.

All components ends with `Element.tsx` in folder `src/layouts` will be imported automatically.

**Example:**

```sh
src
--| layouts
----| Dashboard.tsx
----| DashboardHeaderElement.tsx # wil be used in Dashboard.tsx
----| DashboardFooterElement.tsx # wil be used in Dashboard.tsx
----| DashboardSidebarElement.tsx # wil be used in Dashboard.tsx
```

## Using Layout

You can apply a layout to a route/page by using `definePageMeta` macro.

**Example:**

```tsx
definePageMeta({
  layout: "Dashboard",
});
```

### Typescript Support

All components with name doesn't end with `Element.tsx` will be auto typed. They will be hint when you type a value to `layout` in `definePageMeta` macro.

**Example:**

```sh
src
--| layouts
----| Dashboard.tsx # Will be typed and hint
----| DashboardHeaderElement.tsx # wil be used in Dashboard.tsx
----| DashboardFooterElement.tsx # wil be used in Dashboard.tsx
----| DashboardSidebarElement.tsx # wil be used in Dashboard.tsx
```

Only `Dashboard` will be hint and auto typed.
