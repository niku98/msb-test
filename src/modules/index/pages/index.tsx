import FeaturesBox from "src/modules/index/components/FeaturesBox";
import HeroBanner from "src/modules/index/components/HeroBanner";
import ProductCard from "src/modules/products/components/ProductCard";
import ProductRepository from "src/modules/products/repositories/ProductRepository";

definePageMeta({
  title: "Trang chủ",
  parentMeta: {
    layout: "Main",
  },
});

const IndexIndexPage = () => {
  const { data: response, isInitialLoading } = useObxQuery({
    queryKey: ["products"],
    queryFn: () => {
      return ProductRepository.getList();
    },
    showLoading: false,
  });
  return (
    <>
      <HeroBanner />
      <div className="container">
        <FeaturesBox className="relative -translate-y-1/2" />
      </div>
      <div className="container">
        <h3 className="text-center text-2xl font-bold mb-10">
          Danh sách sản phẩm
        </h3>
        <div className="grid grid-cols-3 gap-x-6 gap-y-10">
          {isInitialLoading ? (
            <>
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
            </>
          ) : (
            <>
              {response?.data?.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default IndexIndexPage;
