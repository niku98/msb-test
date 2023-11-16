import Document from "src/modules/common/components/icons/Document";

interface FeatureBoxProps {
  className?: string;
}

const FeaturesBox = ({ className }: FeatureBoxProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-4 rounded-2xl bg-background shadow-3xl",
        "border",
        className
      )}
    >
      <div className="p-12 pr-9 text-2xl font-bold">
        Vì sao nên chọn chúng tôi
      </div>
      <div className="col-span-3 grid grid-cols-3 py-10">
        <div className="px-4">
          <Document className="text-primary text-4xl" />
          <h5 className="font-bold text-lg">100% online</h5>
          <p className="text-base text-gray">Đăng ký và nộp hồ sơ trực tuyến</p>
        </div>
        <div className="px-4">
          <DocumentCheck className="text-primary text-4xl" />
          <h5 className="font-bold text-lg">Phê duyệt siêu tốc</h5>
          <p className="text-base text-gray">Duyệt hồ sơ nhanh trong 5 phút</p>
        </div>
        <div className="px-4">
          <LayerSwitch className="text-primary text-4xl" />
          <h5 className="font-bold text-lg">Sử dụng linh hoạt</h5>
          <p className="text-base text-gray">
            Dễ dàng chuyển đổi linh hoạt giữa các sản phẩm
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBox;
