import FeaturesBox from "src/modules/index/components/FeaturesBox";
import HeroBanner from "src/modules/index/components/HeroBanner";
import ProductCard from "src/modules/index/components/ProductCard";
import { products } from "src/modules/index/constants/products";

definePageMeta({
  title: "index:index_title",
  menu: {
    title: "index:index_title",
  },
  parentMeta: {
    layout: "Main",
  },
});

const IndexIndexPage = () => {
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
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default IndexIndexPage;
