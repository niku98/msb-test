export default function useAppRoutePaths<
  Path extends Normalize<RoutePaths> | undefined = undefined
>(
  path?: Path | Normalize<RoutePaths>
): Path extends string ? ObjectPropertyType<RoutePaths, Path> : RoutePaths {
  const app = useApp();
  return path ? _get(app.routePaths, path) : (app.routePaths as any);
}
