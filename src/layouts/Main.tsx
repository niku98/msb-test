import { ReactNode } from "react";
import BlankLayout from "src/layouts/Blank";
import MainFooterElement from "src/layouts/MainFooterElement";
import MainHeaderElement from "src/layouts/MainHeaderElement";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <BlankLayout>
      <div className="flex flex-col min-h-screen">
        <MainHeaderElement />
        <main className="bg-light pb-20 flex-grow">
          {children ?? <Outlet />}
        </main>
        <MainFooterElement />
      </div>
    </BlankLayout>
  );
};

export default MainLayout;
