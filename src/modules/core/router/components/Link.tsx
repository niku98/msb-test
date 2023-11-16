import { Link as RLink, LinkProps as RLinkProps } from "react-router-dom";
import { GeneratePathOptions } from "src/modules/core/router/utils/generatePath";

export type LinkProps<T extends string> = GeneratePathOptions<T> &
  Omit<RLinkProps, "to"> & {};

const Link = <T extends string = FullRoutePaths>({
  path,
  params,
  ...props
}: LinkProps<T>) => {
  const href = useMemo(() => {
    return generatePath({ path, params } as GeneratePathOptions<T>);
  }, [path, params]);

  return <RLink to={href} {...props} />;
};

export default Link;
