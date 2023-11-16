import appEnv from "app-env";
import { FunctionComponent, Suspense } from "react";

interface DashboardLayoutProps {}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = () => {
  const routes = useAppRoutes();
  const { t } = useTranslation();

  // Handle page title and breadcrumb
  const currentRoute = useCurrentRoute();
  useEffect(() => {
    if (currentRoute) {
      document.title = t((currentRoute.meta?.title || appEnv.appName) as any);
    }
  }, [currentRoute]);

  return (
    <AntLayout>
      <AntLayout.Sider breakpoint="lg" theme="light" collapsible>
        <BaseMenu mode="inline" theme="light" items={routes} />
      </AntLayout.Sider>
      <AntLayout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <AntSpin spinning />
            </div>
          }
        >
          <AntLayout.Content className="p-8 min-h-screen">
            {!!currentRoute && (
              <div className="pb-5">
                <BaseBreadcrumb current={currentRoute} routes={routes} />
              </div>
            )}
            <Outlet />
          </AntLayout.Content>
        </Suspense>
      </AntLayout>
    </AntLayout>
  );
};

export default DashboardLayout;
