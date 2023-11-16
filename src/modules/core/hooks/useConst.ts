export function useConst<T>(input: T | (() => T)): T {
  const ref = useRef<{ value: T }>();

  if (!ref.current) {
    ref.current = {
      value: typeof input === "function" ? (input as Function)() : input,
    };
  }
  return ref.current.value;
}
