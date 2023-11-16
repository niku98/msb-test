import {
  Navigate as RNavigate,
  NavigateProps as RNavigateProps,
} from "react-router-dom";
import { GeneratePathOptions } from "src/modules/core/router/utils/generatePath";

export type NavigateProps<T extends string> = GeneratePathOptions<T> &
  Omit<RNavigateProps, "to"> & {};

const Navigate = <T extends string = FullRoutePaths>({
  path,
  params,
  ...props
}: NavigateProps<T>) => {
  const href = useMemo(() => {
    return generatePath({ path, params } as GeneratePathOptions<T>);
  }, [path, params]);

  return <RNavigate to={href} {...props} />;
};

export default Navigate;
