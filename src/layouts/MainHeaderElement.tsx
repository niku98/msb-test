import MainHeaderProfileDropdownElement from "src/layouts/MainHeaderProfileDropdownElement";
import AdviceRequestSheet from "src/modules/adviceRequest/components/AdviceRequestSheet";
import LoginModal from "src/modules/auth/components/LoginModal";
import { MenuItem } from "src/modules/common/components/AppMenu";

const menuItems: MenuItem[] = [
  {
    title: "Sản phẩm",
    key: "product",
    children: [
      {
        title: "Thẻ tín dụng",
        key: "credit",
        children: [
          {
            title: "Thẻ Platinum",
            key: "platinum-credit",
          },
          {
            title: "Thẻ Gold",
            key: "gold-credit",
          },
        ],
      },
      {
        title: "Vay",
        key: "rent",
        children: [
          {
            title: "MSB Mastercard mDigi",
            key: "msb-master-card-mdigi",
          },
          {
            title: "MSB Mastercard Super Free",
            key: "msb-master-card-super-free",
          },
          {
            title: "MSB Visa Online",
            key: "msb-visa-online",
          },
          {
            title: "MSB Visa Travel",
            key: "msb-visa-travel",
          },
          {
            title: "MSB Visa Signature",
            key: "msb-visa-signature",
          },
        ],
      },
      {
        title: "Bảo hiểm",
        key: "insurance",
      },
    ],
  },
  {
    title: "So sánh",
    key: "compare",
    children: [
      {
        title: "Dịch vụ",
        key: "service",
      },
    ],
  },
  {
    title: "Câu hỏi thường gặp",
    key: "faq",
  },
  {
    title: "1900 6083",
    key: "hotline",
    icon: <Phone />,
  },
];

const MainHeaderElement = () => {
  // Handle login modal
  const {
    state: loginModalOpened,
    on: openLoginModal,
    change: changeLoginModalOpened,
  } = useToggle();

  // Handle advice request sheet
  const {
    state: adviceRequestSheetOpened,
    on: openAdviceRequest,
    change: changeAdviceRequestSheetOpened,
  } = useToggle();

  // Handle menu items
  const { isAuthenticated } = useAuth();
  const authenticated = isAuthenticated();

  const items = useMemo(() => {
    const result = menuItems.slice(0);
    if (!authenticated) {
      result.splice(-1, 0, {
        title: "Đăng nhập",
        key: "login",
        onClick: openLoginModal,
      });
    }

    return result;
  }, [authenticated]);

  return (
    <header
      className={cn(
        "flex justify-between items-center gap-3",
        "py-4 px-10",
        "bg-background",
        "relative z-50"
      )}
    >
      <Link path="/">
        <img src={Assets.Images.logo} className="cursor-pointer" />
      </Link>

      <div className="flex gap-x-6">
        <nav>
          <AppMenu items={items} />
        </nav>
        <Button variant="secondary" onClick={openAdviceRequest}>
          Yêu cầu tư vấn
        </Button>
        {authenticated ? <MainHeaderProfileDropdownElement /> : null}
      </div>

      <LoginModal
        open={loginModalOpened}
        onOpenChange={changeLoginModalOpened}
      />
      <AdviceRequestSheet
        open={adviceRequestSheetOpened}
        onOpenChange={changeAdviceRequestSheetOpened}
      />
    </header>
  );
};

export default MainHeaderElement;
