import MainHeaderElement from "src/layouts/MainHeaderElement";

interface MainLayoutProps {}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <div>
      <MainHeaderElement />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
