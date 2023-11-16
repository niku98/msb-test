import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  ReactQueryExtraOptions,
  UseObxInfiniteQueryOptions,
  UseObxMutationOptions,
  UseObxQueryOptions,
} from "src/modules/core/query/models";

export function useObxQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(options: UseObxQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const queryContext = useQuery<TQueryFnData, TError, TQueryFnData, TQueryKey>({
    ...options,
    queryFn: async (context: QueryFunctionContext<TQueryKey>) => {
      Api.signal = context.signal;
      return rxLastValueFrom(options.queryFn(context));
    },
  } as any);

  useReactQueryLoading(
    queryContext.isLoading,
    queryContext.isRefetching,
    options.showLoading
  );

  return queryContext;
}

export function useObxInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(options: UseObxInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const queryContext = useInfiniteQuery<
    TQueryFnData,
    TError,
    TQueryFnData,
    TQueryKey
  >({
    ...options,
    queryFn: (context: QueryFunctionContext<TQueryKey>) => {
      Api.signal = context.signal;
      return rxLastValueFrom(options.queryFn(context));
    },
  } as any);

  useReactQueryLoading(
    queryContext.isLoading,
    queryContext.isRefetching,
    options.showLoading
  );

  return queryContext;
}

export function useObxMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(options: UseObxMutationOptions<TData, TError, TVariables, TContext>) {
  const mutationContext = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: (variables: any) => {
      return rxLastValueFrom(options.mutationFn(variables));
    },
  } as any);

  useReactQueryLoading(mutationContext.isLoading, false, options.showLoading);

  return mutationContext;
}

function useReactQueryLoading(
  loading: boolean,
  refetching = false,
  showType: ReactQueryExtraOptions["showLoading"] = false
) {
  try {
    const loadingContext = useLoading();
    const firstRun = useRef(true);

    const showLoading = useMemo(() => {
      switch (showType) {
        case "loading":
          return true;
        case "first-load":
          return firstRun.current;
      }
      return false;
    }, [showType, firstRun.current]);

    useEffect(() => {
      if (!showLoading) {
        return;
      }

      if (loading) {
        loadingContext.startLoading();

        return () => {
          loadingContext.stopLoading();
        };
      } else {
        loadingContext.stopLoading();
      }
    }, [loading]);

    useEffect(() => {
      if (showType !== "refetch") {
        return;
      }

      if (refetching) {
        loadingContext.startLoading();

        return () => {
          loadingContext.stopLoading();
        };
      } else {
        loadingContext.stopLoading();
      }
    }, [refetching]);
  } catch (error) {}
}
