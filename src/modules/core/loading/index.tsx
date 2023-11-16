import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type LoadingContextType = {
  startLoading: () => void;
  stopLoading: () => void;
  state: boolean;
};

export const LoadingContext = React.createContext<
  LoadingContextType | undefined
>(undefined);

export type LoadingComponentType<T = {}> = React.ComponentType<
  {
    state: boolean;
    color?: string;
    children?: ReactNode;
  } & T
>;

export interface LoadingProviderProps {
  color?: string;
  component: LoadingComponentType;
  children?: ReactNode;
}

export function LoadingProvider({
  children,
  color,
  component: Component,
}: LoadingProviderProps) {
  const { state, on: turnOnLoading, off: turnOffLoading } = useToggle();
  const setCount = useState(0)[1];

  const startLoading = useCallback(() => {
    turnOnLoading();
    setCount((cur) => cur + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setCount((cur) => {
      if (cur === 1) {
        turnOffLoading();
        return 0;
      }

      return cur > 0 ? cur - 1 : cur;
    });
  }, []);
  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, state }}>
      <Component state={state} color={color}>
        {children}
      </Component>
    </LoadingContext.Provider>
  );
}

export const useLoading = (state?: boolean) => {
  const context = useContext<LoadingContextType | undefined>(LoadingContext);

  if (context === undefined) {
    throw new Error("useLoading must be used in LoadingProvider");
  }

  useEffect(() => {
    if (typeof state === "undefined") {
      return;
    }

    if (state) {
      context.startLoading();
    } else {
      context.stopLoading();
    }
  }, [state, context]);

  return context;
};
