---
title: Model Definition
---

# {{$frontmatter.title}}

- You have to define model for all resource, include resource's request and resource's response.

- You have to define resource's models in `src/models` with global resource. With module local resources, their models should be placed in `src/modules/<module-name>/models`.

Example:

```ts
// src/modesl/Empoyee.ts
import { Moment } from "moment";
import { ListResponse, SingleResponse } from "./BaseResponses";
import { ListRequest } from "./ListRequest";
export interface Employee {
  id?: string;
  code: string;
  name: string;
  birthday: number | Moment;
  gender: string;
  email: string;
  phone: string;
  started_at: string | Moment;
  tenant_id: string;
  salary: number;
}

export type EmployeeResponse = SingleResponse<Employee>;
export type ListEmployeeResponse = ListResponse<Employee>;
export type ListEmployeeRequest = ListRequest;
```
