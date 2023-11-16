import {
  NavigateOptions,
  useNavigate as useRouterNavigate,
} from "react-router-dom";
import { GeneratePathOptions } from "src/modules/core/router/utils/generatePath";

export default function useNavigate() {
  const navigate = useRouterNavigate();

  return function appNavigate<T extends string = FullRoutePaths>(
    path: GeneratePathOptions<T>,
    options?: NavigateOptions
  ) {
    return navigate(generatePath(path), options);
  };
}
