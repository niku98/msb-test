type KebabCase<S> = S extends `${infer C}${infer T}`
  ? KebabCase<T> extends infer U
    ? U extends string
      ? T extends Uncapitalize<T>
        ? `${Uncapitalize<C>}${U}`
        : `${Uncapitalize<C>}-${U}`
      : never
    : never
  : S;

type ToCamel<S extends string | number | symbol> = S extends string
  ? S extends `${infer Head}_${infer Tail}`
    ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
    : S extends `${infer Head}-${infer Tail}`
    ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
    : Uncapitalize<S>
  : never;

type PascalCase<S extends string> = S extends string
  ? S extends `${infer Head}_${infer Tail}`
    ? `${Capitalize<ToCamel<Head>>}${Capitalize<ToCamel<Tail>>}`
    : S extends `${infer Head}-${infer Tail}`
    ? `${Capitalize<ToCamel<Head>>}${Capitalize<ToCamel<Tail>>}`
    : Capitalize<S>
  : never;

type ObjectPropertyType<
  Obj extends Record<string, any>,
  Key extends string
> = Key extends `${infer A}.${infer B}`
  ? Obj[A] extends Record<string, any>
    ? ObjectPropertyType<Obj[A], B>
    : Obj[A]
  : Obj[Key];

// ----- Localization
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

type WithOrWithoutPlural<K> = "v4" extends "v4"
  ? K extends `${infer B}_${"zero" | "one" | "two" | "few" | "many" | "other"}`
    ? B | K
    : K
  : K;

// Normalize single namespace
type KeysWithSeparator<K1, K2, S extends string = "."> = `${K1 &
  string}${S}${K2 & string}`;
type KeysWithSeparator2<K1, K2> = KeysWithSeparator<
  K1,
  Exclude<K2, keyof any[]>
>;
type Normalize2<T, K = keyof T> = K extends keyof T
  ? T[K] extends Record<string, any>
    ? T[K] extends readonly any[]
      ?
          | KeysWithSeparator2<K, WithOrWithoutPlural<keyof T[K]>>
          | KeysWithSeparator2<K, Normalize2<T[K]>>
      :
          | KeysWithSeparator<K, WithOrWithoutPlural<keyof T[K]>>
          | KeysWithSeparator<K, Normalize2<T[K]>>
    : never
  : never;
type Normalize<T> = WithOrWithoutPlural<keyof T> | Normalize2<T>;

type KeyWithNSSeparator<N, K> = `${N & string}:${K & string}`;
type NormalizeMulti<T, U extends keyof T, L = LastOf<U>> = L extends U
  ? KeyWithNSSeparator<L, Normalize<T[L]>> | NormalizeMulti<T, Exclude<U, L>>
  : never;
