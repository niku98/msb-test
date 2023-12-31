import { DebounceSettings } from "lodash-es";
import { SetStateAction } from "react";

export function useDebounceState<T>(
  defaultValue: T,
  options: DebounceSettings & { wait: number }
): [T, (value: SetStateAction<T>) => void] {
  const [debounced, setDebounced] = useState<T>(defaultValue);

  const { run } = useDebounceFn((value: SetStateAction<T>) => {
    setDebounced(value);
  }, options);

  return [debounced, run];
}
