interface MainFooterElementProps {}

const MainFooterElement = (props: MainFooterElementProps) => {
  return (
    <footer className="bg-background ">
      <div className="container py-5 flex justify-between text-gray text-sm">
        <span>
          Bản quyền © 2021 thuộc về Ngân hàng TMCP Hàng Hải Việt Nam MSB
        </span>

        <div className="space-x-6">
          <Link path="#">Điều khoản dịch vụ</Link>
          <Link path="#">Ngân hàng điện tử</Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooterElement;
