import MainFooterElement from "src/layouts/MainFooterElement";
import MainHeaderElement from "src/layouts/MainHeaderElement";

interface MainLayoutProps {}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className="flex flex-col">
      <MainHeaderElement />
      <main className="bg-light pb-20 flex-grow">
        <Outlet />
      </main>
      <MainFooterElement />
    </div>
  );
};

export default MainLayout;
