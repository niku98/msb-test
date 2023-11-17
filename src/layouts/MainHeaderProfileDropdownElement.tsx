import { ChevronDown } from "lucide-react";

interface MainHeaderProfileDropdownElementProps {}

const MainHeaderProfileDropdownElement = (
  props: MainHeaderProfileDropdownElementProps
) => {
  const { authState, logout } = useAuth();
  return (
    <DropdownMenu>
      <div className="pl-6 relative flex items-center">
        <div className="w-[1.5px] h-4 bg-gray-400 absolute left-0 top-1/2 -translate-y-1/2"></div>
        <DropdownMenuTrigger className="focus-visible:outline-none inline-flex space-x-2 items-center">
          <div className="inline-flex bg-gray-400 rounded-full items-center justify-center w-8 h-8">
            <User className="inline-block text-white" />
          </div>
          <span className="text-sm font-medium">
            {authState.user?.firstName} {authState.user?.lastName}
          </span>
          <ChevronDown className="text-xl text-gray-500" />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end" side="bottom" sideOffset={28}>
        <Link path="/profile">
          <DropdownMenuItem>Quản lý tài khoản</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainHeaderProfileDropdownElement;
