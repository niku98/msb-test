type Split<T extends string> = T extends `${infer P}/`
  ? Split<P>
  : T extends `/${infer P}`
  ? Split<P>
  : T extends `${infer PL}/${infer PR}`
  ? Split<PL> | Split<PR>
  : T;

type PathParamsKey<T extends string, K = Split<T>> = K extends `:${infer P}`
  ? P
  : K extends `...${infer P}`
  ? P
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  K extends `${infer _P}*`
  ? "slug"
  : never;

type PathParams<T extends string> = {
  [P in PathParamsKey<T>]: string | number;
};

export type GeneratePathOptions<
  T extends string,
  Params extends object = PathParams<T>
> = {
  path: T;
} & (keyof Params extends never ? { params?: Params } : { params: Params });

export default function generatePath<T extends string>({
  path,
  params,
}: GeneratePathOptions<T>): string {
  let result: string = path;

  if (params) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key as keyof typeof params] as string;
        result = result.replace(`:${key}`, value);
      }
    }

    if ("slug" in params && result.endsWith("*")) {
      result = result.replace(/\*$/, params.slug as string);
    }
  }

  return result;
}
