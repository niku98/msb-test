import { LoadingComponentType } from "src/modules/core/loading";

const AppMainLoading: LoadingComponentType<{ fullscreen?: boolean }> = ({
  state,
  children,
  fullscreen = true,
}) => {
  return (
    <div className={"relative"}>
      {state && (
        <div
          className={cn(
            "inset-0 bg-white bg-opacity-30 z-[999999] flex items-center justify-center",
            fullscreen ? "fixed" : "absolute"
          )}
        >
          <div className="loader"></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default AppMainLoading;
