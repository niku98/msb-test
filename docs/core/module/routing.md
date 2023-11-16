---
title: Module - Routing
---

# {{$frontmatter.title}}

## File Based Routing

This project provide **File Based Routing**. That mean, each page you added to `pages` folder is associated with a route.

**Example:** We have a module called `dashboard`. Inside it, we create `pages/child.tsx`, it will be accessible at `/dashboard/child`.

## Nested Routes

[Nested routes](https://router.vuejs.org/guide/essentials/nested-routes.html) is supported.

**Example:**

```
src/
-| modules
---| dashboard
-----| pages/
-------| parent/
---------| child.tsx
-------| parent.tsx
```

With the folder structure above, generated routes will look like this:

```ts
[
  {
    path: "/dashboard",
    children: [
      {
        path: "/dashboard/parent",
        component: lazy(() => import("@/modules/dashboard/pages/parent.tsx")),
        children: [
          {
            path: "/dashboard/parent/child",
            component: lazy(
              () => import("@/modules/dashboard/pages/parent/child.tsx")
            ),
          },
        ],
      },
    ],
  },
];
```

## Index page

If you want to display a index page of a routes list. Just name it `index.tsx`.

**Example:**

```
src/
-| modules
---| dashboard
-----| pages/
-------| index.tsx
-------| parent/
---------| index.tsx
---------| child.tsx
-------| parent.tsx
```

The tree folder above will generate routes like this:

```ts
[
  {
    path: "/dashboard",
    name: "Dashboard",
    component: lazy(() => import("@/modules/dashboard/pages/index.tsx")),
    children: [
      {
        path: "/dashboard/parent",
        component: lazy(() => import("@/modules/dashboard/pages/parent.tsx")),
        children: [
          {
            path: "/dashboard/parent",
            component: lazy(
              () => import("@/modules/dashboard/pages/parent/index.tsx")
            ),
          },
          {
            path: "/dashboard/parent/child",
            component: lazy(
              () => import("@/modules/dashboard/pages/parent/child.tsx")
            ),
          },
        ],
      },
    ],
  },
];
```

## Dynamic Route

To activate [dynamic route](https://router.vuejs.org/guide/essentials/dynamic-matching.html), just put your route param in a square brackets pair.

**Example:**

```
src/
-| modules
---| dashboard
-----| pages/
-------| user-group/
---------| [id].tsx
---------| index.tsx
```

Then, you can access to param `id` with `useParams` hook.

```tsx
// dashboard/pages/user-[group]/[id].tsx
export default function UserGroupDetail() {
  const { id } = useParams();

  return <></>;
}
```

### Catch All Routes

If you need to catch all routes. You can do it by a file named `[...slug].tsx`. It will match all routes under that path.

```tsx
export default function AllRoutes() {
  const slug = useParams()["*"];
}
```

### With Named Route

Dynamic route still have a name, but not always clear. So if you want a clear name. You could name you page file like this `<route-name>_[param].tsx`.

**Example:**

```
src/
-| modules
---| dashboard
-----| pages/
-------| user-list_users-[group]/
---------| detail_[id].tsx
---------| index.tsx
```

Two routes above will be named:

- `user-list_users-[group]/index.tsx`: `Dashboard.UserList.Index`.
- `user-list_users-[group]/detail_[id].tsx`: `Dashboard.UserList.Detail`.

And paths will look like this:

- `user-list_users-[group]/index.tsx`: `/dashboard/users-:group`.
- `user-list_users-[group]/detail_[id].tsx`: `/dashboard/users-:group/:id`.

## Navigation

::: warning
All navigation methods bellow are provided by project.

So, You shouldn't use the same methods provided by **react-router-dom**.
:::

### Link
This project provide component `Link` to navigate between route when user click. It's fully typed.

```tsx
export default function Page() {
  return <Link path="/dashboard">Dashboard</Link>
}
```

With route has param(s), it provide a prop `params` help you pass parameters into path.

```tsx
export default function Page() {
  return <Link path="/dashboard/posts/:id" params={{id: 1}}>Dashboard</Link>
}
```

### Navigate
This project provide component `Navigate` to navigate between route immediately. It's fully typed.

```tsx
export default function Page() {
  return <Navigate path="/dashboard">Dashboard</Navigate>
}
```

With route has param(s), it provide a prop `params` help you pass parameters into path.

```tsx
export default function Page() {
  return <Navigate path="/dashboard/posts/:id" params={{id: 1}}>Dashboard</Navigate>
}
```

### useNavigate
This project provide hook `useNavigate` to navigate between route in your logic code. It's fully typed.

```tsx
export default function Page() {
  const navigate = useNavigate();
  
  const navigateToDashboard = () => {
    navigate({
      path: "/dashboard"
    })
  }
  
  return <button onClick={navigateToDashboard}>Go to Dashboard</button>
}
```

With route has param(s), it provide a prop `params` help you pass parameters into path.

```tsx
export default function Page() {
  const navigate = useNavigate();
  
  const navigateToPostDetail = () => {
    navigate({
      path: "/dashboard/posts/:id",
      params: {
        id: 1
      }
    })
  }
  
  return <button onClick={navigateToPostDetail}>View post detail</button>
}
```

## Page Metadata

You can add metadata for each route using `definePageMeta` macro.

```tsx
// ...
definePageMeta({
  title: "My home page",
});
```

`definePageMeta` is a compiler macro. It will be compiled away so you cannot reference it within your component. Instead, the metadata passed to it will be hoisted out of the component. Therefore, the page meta object cannot reference the component (or values defined on the component). However, it can reference imported bindings.

```tsx
import { someData } from "@/utils/example";

const title = "123";

definePageMeta({
  title, // An error will be threw
  someData, // Will work
});
```

## Using Route Paths

You may access to route paths via `useAppRoutePaths` hook.

They are generated, structure like your module's `pages` folder, and fully typed.

```tsx
export default function SomePageInProject() {
  // Retrieve full app route paths
  const AppRoutePaths = useAppRoutePaths();

  // Retrieve module route path
  const dashboardRoutePaths = useAppRoutePaths("Dashboard");

  // Retrieve one route path
  const dashboardIndexRoutePaths = useAppRoutePaths("Dashboard.Index");

  return <></>;
}
```
