type ObjectPaths2<
  TObject extends object,
  Keys = keyof TObject
> = Keys extends keyof TObject
  ? TObject[Keys] extends Record<string, any>
    ? TObject[Keys] extends any[]
      ? never
      :
          | `${Keys & string}.${keyof TObject[Keys] & string}`
          | `${Keys & string}.${ObjectPaths2<TObject[Keys]> & string}`
    : never
  : never;

type ObjectPaths<
  TObject,
  Keys extends keyof TObject = keyof TObject
> = TObject extends object ? Keys | ObjectPaths2<TObject> : string;

// --------------------------------------

export type TransformCustom<L, R, S = undefined> = S extends undefined
  ? (value: R) => L
  : (value: R, source: S) => L;

export type TransformTuple<L, S> = [ObjectPaths<S>, TransformCustom<L, any, S>];

export type TransformRuleSimple<L, R, S> =
  | true
  | (S extends Record<string, any> ? ObjectPaths<S> : string)
  | TransformCustom<L, R, S>
  | TransformTuple<L, S>;

export type TransformRule<
  T extends Record<string, any>,
  S extends Record<string, any> | null | undefined,
  K extends keyof T,
  RS extends Record<string, any> | null | undefined
> = K extends keyof S
  ?
      | TransformRuleSimple<T[K], S[K], RS>
      | (T[K] extends object
          ? TransformMap<
              T[K],
              S[K] extends Record<string, any> ? S[K] : undefined,
              RS
            >
          : never)
  :
      | TransformRuleSimple<T[K], S, RS>
      | (T[K] extends object ? TransformMap<T[K], S, RS> : never);

export type TransformMap<
  T extends Record<string, any>,
  S extends Record<string, any> | null | undefined,
  RS extends Record<string, any> | null | undefined
> = {
  [K in keyof T]: TransformRule<T, S, K, RS>;
};

export type TransformItem<
  T extends Record<string, any>,
  S extends Record<string, any> | null | undefined
> = (target: T, source: S, rootSource: any) => void;

export type Transform<
  S extends Record<string, any> | null | undefined,
  T extends Record<string, any>
> = (source: S, rootSource?: any) => T;

export interface TransformOptions {
  undefinedToNull?: boolean;
  noEmptyObjects?: boolean;
}

type GET_KEY<S, K> = K extends keyof S ? S[K] : undefined;

function typeOf<T>(value: T): string {
  const type = typeof value;

  if (type !== "object") {
    return type;
  } else if (value === null) {
    return "null";
  } else if (Array.isArray(value)) {
    return "array";
  } else {
    return "object";
  }
}

function isEmptyObject<T extends Record<any, any>>(value: T): boolean {
  const keys = Object.keys(value);

  for (let i = 0; i < keys.length; i++) {
    if (value[keys[i]] !== undefined && value[keys[i]] !== null) {
      return false;
    }
  }

  return true;
}

function isPointer(value: any): value is string {
  return typeof value === "string";
}

function isTransformCustom<L, R>(
  value: any
): value is TransformCustom<L, R, any> {
  return typeof value === "function";
}

function isTransformTuple<L>(
  value: any
): value is TransformTuple<L, undefined> {
  return (
    Array.isArray(value) && isPointer(value[0]) && isTransformCustom(value[1])
  );
}

function isTransformMap<
  T extends Record<string, any>,
  S extends Record<string, any> | undefined
>(value: any): value is TransformMap<T, S, S> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function setProperty<T extends Record<string, any>, K extends keyof T>(
  target: T,
  key: K,
  value: T[K],
  options: TransformOptions
): void {
  _set(
    target,
    key,
    value === undefined
      ? options.undefinedToNull
        ? (null as any)
        : (undefined as any)
      : value
  );
}

function makeTransformItem<
  T extends Record<string, any>,
  S extends Record<string, any>,
  K extends keyof T
>(
  key: K,
  rule: TransformRule<T, S, K, S>,
  options: TransformOptions
): TransformItem<T, S> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (rule === true) {
    // copy value in place
    return (target, source) =>
      setProperty(target, key, source[key as string], options);
  } else if (isPointer(rule)) {
    // copy value at pointer from source
    return (target, _, rootSource) =>
      setProperty(target, key, _get(rootSource, rule), options);
  } else if (isTransformCustom<T[K], GET_KEY<S, K>>(rule)) {
    // transform value in place
    return (target, source, rootSource) =>
      setProperty(
        target,
        key,
        rule(key in source ? source[key as string] : rootSource, rootSource),
        options
      );
  } else if (isTransformTuple<T[K]>(rule)) {
    const transformCustom = rule[1] as TransformCustom<T[K], any, any>;

    // transform value at pointer from source
    return (target, _, rootSource) => {
      const value = _get(rootSource, rule[0]);

      setProperty(target, key, transformCustom(value, rootSource), options);
    };
  } else if (isTransformMap<T[K], GET_KEY<S, K>>(rule)) {
    const transform = createTransformer<GET_KEY<S, K>, T[K]>(rule, options);

    // transform object
    return (target, source, rootSource) => {
      setProperty(
        target,
        key,
        transform(source[key as string], rootSource),
        options
      );

      // empty object check
      if (options.noEmptyObjects && isEmptyObject(target[key])) {
        target[key] = options.undefinedToNull
          ? (null as any)
          : (undefined as any);
      }
    };
  } else {
    // interpret value as literal
    return (target) => (target[key] = rule as any);
  }
}

export default function createTransformer<
  S extends Record<string, any> | null | undefined,
  T extends Record<string, any>
>(
  transformMap: TransformMap<T, S, S>,
  options: TransformOptions = {}
): Transform<S, T> {
  const transformItems = (Object.keys(transformMap) as (keyof T)[]).map((key) =>
    makeTransformItem(key as any, transformMap[key] as any, options)
  );

  return (source, rootSource) => {
    const target: any = {};

    // ensure source is an object
    source = typeOf(source) === "object" ? source : ({} as S);

    // apply transform items
    for (const transformItem of transformItems) {
      try {
        transformItem(target, source as any, rootSource ?? source);
      } catch (err) {
        continue;
      }
    }

    return target as T;
  };
}
