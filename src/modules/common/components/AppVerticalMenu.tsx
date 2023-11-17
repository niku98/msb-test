import { ReactNode } from "react";

interface AppVerticalMenuProps {
  className?: string;
  children?: ReactNode;
}

const AppVerticalMenu = ({ className, children }: AppVerticalMenuProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export type AppVerticalMenuItemProps = {
  className?: string;
  title?: ReactNode;
  icon?: ReactNode;
  path?: string;
  onClick?: () => void;
};

AppVerticalMenu.Item = ({
  className,
  title,
  icon,
  path,
  onClick,
}: AppVerticalMenuItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = useMemo(
    () => (path ? pathMatched(location.pathname, path, true) : false),
    [path, location.pathname]
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (path) {
      navigate({ path });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 cursor-pointer",
        isActive ? "bg-primary/5" : "hover:bg-black/5",
        className
      )}
      onClick={handleClick}
    >
      {icon !== undefined ? (
        <span
          className={cn(
            "inline-block text-2xl",
            isActive ? "text-primary" : "text-gray-500"
          )}
        >
          {icon}
        </span>
      ) : null}
      {title !== undefined ? (
        <span className={cn(isActive ? "text-primary" : "text-black")}>
          {title}
        </span>
      ) : null}
    </div>
  );
};

export default AppVerticalMenu;
