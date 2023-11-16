import { LoadingComponentType } from "src/modules/core/loading";

const AppMainLoading: LoadingComponentType<{ fullscreen?: boolean }> = ({
  state,
  children,
  fullscreen = true,
}) => {
  return (
    <div
      className={
        fullscreen
          ? "min-h-screen fixed z-[99999] inset-0"
          : "!max-h-[unset] relative"
      }
    >
      {state && (
        <div className="absolute inset-0 bg-white bg-opacity-30 z-[999999] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default AppMainLoading;
