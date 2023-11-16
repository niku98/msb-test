import { ComponentType, Suspense } from "react";

export interface LayoutLoaderProps {}

export default function LayoutLoader() {
  const currentRoute = useCurrentRoute();
  const [Layout, setLayout] = useState<ComponentType>();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (currentRoute?.meta?.layout) {
      startLoading();
      import(`../../../../layouts/${currentRoute?.meta?.layout}.tsx`).then(
        (imported) => {
          stopLoading();

          if (!imported.default) {
            throw new Error(
              `${currentRoute?.meta?.layout} must have an export default.`
            );
          }
          setLayout(() => imported.default);
        }
      );
    } else {
      setLayout(() => Outlet);
    }
  }, [currentRoute?.meta?.layout]);

  return <Suspense>{Layout ? <Layout /> : <Outlet />}</Suspense>;
}
