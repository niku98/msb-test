import {
  NavLink as RNavLink,
  NavLinkProps as RNavLinkProps,
} from "react-router-dom";
import { GeneratePathOptions } from "src/modules/core/router/utils/generatePath";

export type NavLinkProps<T extends string> = GeneratePathOptions<T> &
  Omit<RNavLinkProps, "to"> & {};

const NavLink = <T extends string = FullRoutePaths>({
  path,
  params,
  ...props
}: NavLinkProps<T>) => {
  const href = useMemo(() => {
    return generatePath({ path, params } as GeneratePathOptions<T>);
  }, [path, params]);

  return <RNavLink to={href} {...props} />;
};

export default NavLink;
