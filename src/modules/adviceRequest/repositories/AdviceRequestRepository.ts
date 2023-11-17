import appEnv from "app-env";
import { AdviceRequest } from "src/modules/adviceRequest/models/AdviceRequest";

const AdviceRequestRepository = createRepository(
  {
    baseURL: `${appEnv.apiUrl}/advice-requests`,
  },
  {
    create(api, values: AdviceRequest) {
      return api.post("", values);
    },
  }
);

export default AdviceRequestRepository;
