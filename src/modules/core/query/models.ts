import {
  QueryFunctionContext,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { Observable } from "rxjs";

export interface ReactQueryExtraOptions<Refetch extends boolean = true> {
  showLoading?:
    | "loading"
    | (Refetch extends true ? "refetch" : never)
    | "first-load"
    | false;
}

export type UseObxQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey
> = ReactQueryExtraOptions &
  Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryFn"> & {
    queryFn: (context: QueryFunctionContext<TQueryKey>) => Observable<TData>;
  };

export type UseObxInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey
> = ReactQueryExtraOptions &
  Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryFn"
  > & {
    queryFn: (context: QueryFunctionContext<TQueryKey>) => Observable<TData>;
  };

export type UseObxMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> = ReactQueryExtraOptions<false> &
  Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  > & {
    mutationFn: (variables: TVariables) => Observable<TData>;
  };
