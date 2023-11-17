import appEnv from "app-env";
import { ReactNode } from "react";
import MainFooterElement from "src/layouts/MainFooterElement";
import MainHeaderElement from "src/layouts/MainHeaderElement";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation();

  // Handle page title and breadcrumb
  const currentRoute = useCurrentRoute();
  useEffect(() => {
    if (currentRoute) {
      document.title = t((currentRoute.meta?.title || appEnv.appName) as any);
    }
  }, [currentRoute]);

  return (
    <div className="flex flex-col">
      <MainHeaderElement />
      <main className="bg-light pb-20 flex-grow">{children ?? <Outlet />}</main>
      <MainFooterElement />
    </div>
  );
};

export default MainLayout;
