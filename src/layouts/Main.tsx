interface MainLayoutProps {}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
