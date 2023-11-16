import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();
  const { t } = useTranslation("errors");

  if (isRouteErrorResponse(error)) {
    return (
      <AppState
        status={error.status as any}
        title={t(`${error.status}.title` as any)}
        subTitle={t(`${error.status}.sub_title` as any)}
      />
    );
  }

  throw error;
};

export default RouteError;
