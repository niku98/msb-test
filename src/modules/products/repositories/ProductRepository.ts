import appEnv from "app-env";
import { GetListProductResponse } from "src/modules/products/models/Product";

const ProductRepository = createRepository(
  {
    baseURL: `${appEnv.apiUrl}/products`,
  },
  {
    getList(api) {
      return api.get<GetListProductResponse>("");
    },
  }
);

export default ProductRepository;
