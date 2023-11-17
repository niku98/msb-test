import appEnv from "app-env";
import { ReactNode } from "react";

interface BlankProps {
  children?: ReactNode;
}

const BlankLayout = ({ children }: BlankProps) => {
  const { t } = useTranslation();

  // Handle page title and breadcrumb
  const currentRoute = useCurrentRoute();

  useEffect(() => {
    if (currentRoute) {
      document.title = t((currentRoute.meta?.title || appEnv.appName) as any);
    }
  }, [currentRoute]);

  return <>{children ?? <Outlet />}</>;
};

export default BlankLayout;
