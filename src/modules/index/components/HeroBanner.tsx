interface HeroBannerProps {}

const people = [
  Assets.Images.heroBanner.people.one,
  Assets.Images.heroBanner.people.two,
  Assets.Images.heroBanner.people.three,
  Assets.Images.heroBanner.people.plus,
];

const HeroBanner = (props: HeroBannerProps) => {
  return (
    <section className="relative overflow-hidden">
      <img src={Assets.Images.heroBanner.bg} />

      <div className="container absolute top-0 left-1/2 -translate-x-1/2 h-full flex items-center">
        <img
          src={Assets.Images.heroBanner.task}
          className="absolute top-0 right-0"
        />
        <img
          src={Assets.Images.heroBanner.person}
          className="absolute bottom-0 right-0"
        />
        <div className="max-w-[423px]">
          <h3 className="text-4xl font-bold">
            Trải nghiệm sống cực chất cho <br />
            dân văn phòng
          </h3>
          <p className="text-gray text-base mt-4">
            Lương từ 8 triệu/tháng, nhận ngay tới <br />
            200 triệu VND
          </p>

          <Button className="w-44 mt-8">Khám phá ngay</Button>
        </div>

        <div className="absolute bottom-32 right-20">
          <div className="-space-x-2 mb-1">
            {people.map((person, index) => (
              <img key={index} src={person} className="w-9 h-9 inline-block" />
            ))}
          </div>
          <div className="inline-flex items-center gap-4 w-48">
            <span className="text-xl font-bold">289K+</span>
            <span className="inline-block w-[2px] h-7 bg-gray"></span>
            <span className="text-xs text-gray">Đơn phê duyệt thành công</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
