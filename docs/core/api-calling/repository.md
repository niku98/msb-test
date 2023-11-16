---
title: Repository Definition
---

# {{$frontmatter.title}}

- Api Calling will be processed in Repository
- Each repository is only in charge of one resource.

  Example: The **_Post resource_** api will be in the PostRepository.

- With global repositories should be placed in folder `src/repositories`. And module local repostiries should be placed in folder `src/modules/<module-name>/repositories`.

- Each api calling method need to declare models for request and response(It is step 2).

- You can use snippet `repo-func` to generate a Repository. It is declared in this project.

  Example:

  ```ts
  // src/repositories/PostRepository
  import env from "src/core/env";
  import { createRepository } from "src/core/repository";

  const PostRepository = createRepository(
    {
      baseURL: `${env.API_URL}/api/posts`,
    },
    {
      getList(api, params: GetListPostRequest) {
        return api.get<GetListPostResponse>("", params);
      },
      getOne(api, id: string) {
        return api.get(`/${id}`);
      },
      create(api, data: CreatePostRequest) {
        return api.post<CreatePostResponse>("", data);
      },
      update(api, id: string, data: UpdatePostRequest) {
        return api.put<UpdatePostResponse>(`/${id}`, data);
      },
      delete(api, id: string) {
        return api.delete<DeletePostResponse>(`/${id}`);
      },
    }
  );

  export default PostRepository;
  ```

### Type Declarations

```ts
interface RepositoryInputFunc<D, P extends any[]> {
  (api: Api, ...params: P): Observable<AxiosResponse<D>>;
}

type CreateRepositoryInput = {
  [key: string]: RepositoryInputFunc<any, any>;
};

type CreateRepositoryOutput<Input, Keys extends keyof Input = keyof Input> = {
  [P in Keys]: Input[P] extends RepositoryInputFunc<infer D, infer P>
    ? (...params: P) => Observable<AxiosResponse<D>>
    : any;
};

export function createRepository<Input extends CreateRepositoryInput>(
  config: ApiRequestConfig,
  input: Input
): CreateRepositoryOutput<Input>;
```
