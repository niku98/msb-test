import { ChevronRight } from "lucide-react";
import MainLayout from "src/layouts/Main";

interface ProfileLayoutProps {}

const ProfileLayout = (props: ProfileLayoutProps) => {
  const { authState, logout } = useAuth();

  return (
    <MainLayout>
      <div className="container grid grid-cols-3 gap-6 pt-6">
        <div className="col-span-3 space-x-1  ">
          <Link path="/" className="text-sm text-gray-500">
            Trang chủ
          </Link>
          <ChevronRight className="inline-block w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-primary">
            Quản lý tài khoản
          </span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              {authState.user?.firstName} {authState.user?.lastName}
            </CardTitle>
          </CardHeader>
          <AppVerticalMenu>
            <AppVerticalMenu.Item
              path="/profile"
              icon={<UserOutline />}
              title="Thông tin tài khoản"
            />
            <AppVerticalMenu.Item
              path="/profile/products"
              icon={<DocumentOutline />}
              title="Thông tin sản phẩm"
            />
            <AppVerticalMenu.Item
              icon={<Logout />}
              title="Đăng xuất"
              onClick={logout}
            />
          </AppVerticalMenu>
        </Card>
        <div className="col-span-2">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileLayout;
