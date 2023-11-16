import { ComponentType } from "react";

interface PageLoaderProps {
  factory: () => Promise<{ default: ComponentType }>;
}

const PageLoader = ({ factory }: PageLoaderProps) => {
  const [Page, setPage] = useState<ComponentType>();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    factory()
      .then((imported) => {
        setPage(() => imported.default);
        stopLoading();
      })
      .catch((error) => {
        console.error(error);
        stopLoading();
      });
  }, [factory]);

  return Page ? <Page /> : null;
};

export default memo(PageLoader);
