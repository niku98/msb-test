import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

export interface MenuItem {
  title: string;
  key: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: MenuItem[];
}

export interface AppMenuProps {
  items: MenuItem[];
  className?: string;
}

const AppMenu = ({ items, className }: AppMenuProps) => {
  return (
    <ul className={cn("app-menu", className)}>
      {items.map((item) => {
        return (
          <li key={item.key} className="app-menu__item" onClick={item.onClick}>
            <span className="app-menu__item-title">
              <span className="mr-1">{item.icon}</span>
              {item.title}
            </span>

            {item.children && item.children.length ? (
              <>
                <ChevronDown className="app-menu__item-icon" />
                <AppMenu items={item.children} className="app-menu__sub-menu" />
              </>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default AppMenu;
