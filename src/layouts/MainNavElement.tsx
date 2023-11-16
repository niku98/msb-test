interface MainNavElementProps {}

const MainNavElement = (props: MainNavElementProps) => {
  return (
    <nav>
      <AppMenu
        items={[
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
            title: "Đăng nhập",
            key: "login",
          },
          {
            title: "1900 6083",
            key: "hotline",
            icon: <Phone />,
          },
        ]}
      />
    </nav>
  );
};

export default MainNavElement;
