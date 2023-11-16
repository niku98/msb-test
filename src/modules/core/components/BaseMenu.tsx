import { SiderContext } from "antd/es/layout/Sider";
import { MenuTheme } from "antd/es/menu/MenuContext";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { MenuMode } from "rc-menu/lib/interface";
import { createElement } from "react";

interface Props {
  items: AppRoute[];
  mode?: MenuMode;
  theme?: MenuTheme;
  className?: string;
  showChildren?: boolean;
  onCurrentMenuItemChange?: (item: AppRoute) => void;
}

const BaseMenu = ({
  items,
  mode,
  theme,
  className,
  showChildren = true,
  onCurrentMenuItemChange,
}: Props) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { can } = useAuth();
  const { siderCollapsed } = useContext(SiderContext);

  const [activeKey, setActiveKey] = useState<string>("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const getTitle = useCallback((route: AppRoute) => {
    if (
      route.meta?.menu === undefined ||
      typeof route.meta.menu === "boolean"
    ) {
      return t(route.meta?.title as any);
    }

    return t(route.meta.menu.title as any);
  }, []);

  const onOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  const setCurrentMenuItem = useCallback(
    (curItems: AppRoute[], parent?: AppRoute) => {
      for (const item of curItems) {
        if (pathMatched(location.pathname, item.path ?? "")) {
          if (showChildren && isShowChildren(item) && item.children) {
            const openKey = item.path ? `${item.path}-group` : "";
            if (!siderCollapsed) {
              if (parent) {
                setOpenKeys((current) => [...current, openKey]);
              } else {
                setOpenKeys([openKey]);
              }
            }
            setCurrentMenuItem(item.children, item);
            return;
          } else {
            if (item.children && item.children.length) {
              onCurrentMenuItemChange && onCurrentMenuItemChange(item);
              setActiveKey(item.path ?? "");
              return;
            } else if (pathMatched(location.pathname, item.path ?? "", true)) {
              onCurrentMenuItemChange && onCurrentMenuItemChange(item);
              setActiveKey(item.path ?? "");
              return;
            }
          }
        }
      }

      if (!parent) {
        setOpenKeys([]);
        setActiveKey("");
      }
    },
    [location.pathname, onCurrentMenuItemChange, showChildren]
  );

  useEffect(() => {
    setCurrentMenuItem(items);
  }, [setCurrentMenuItem, items]);

  // Handle menu items for render
  const generateMenuItems = useCallback(
    (items: AppRoute[]): ItemType[] => {
      const sortedItems = [...items];
      sortedItems.sort((a, b) => (a.meta?.order ?? 0) - (b.meta?.order ?? 0));

      return sortedItems.reduce<ItemType[]>((result, item) => {
        const childrenGrantedPermission = item.children
          ? item.children.filter((route) => can(route.meta?.permissions || []))
              .length > 0
          : false;
        const hasShowChildren = item.children
          ? item.children.filter((route) => isShowSelf(route)).length > 0
          : false;

        if (item.children && showChildren && isShowChildren(item)) {
          if (childrenGrantedPermission && hasShowChildren) {
            result.push({
              key: item.path ? `${item.path}-group` : "",
              icon: item.meta?.icon
                ? createElement(item.meta?.icon)
                : undefined,
              label: getTitle(item),
              children: generateMenuItems(item.children),
            });
          }
        } else if (isShowSelf(item) && can(item.meta?.permissions || [])) {
          result.push({
            key: item.path ?? "",
            label: <Link path={item.path ?? ""}>{getTitle(item)}</Link>,
            icon: item.meta?.icon ? createElement(item.meta?.icon) : undefined,
          });
        }

        return result;
      }, []);
    },
    [showChildren, can, t]
  );

  const menuItems = useMemo(() => {
    return generateMenuItems(items);
  }, [generateMenuItems, items]);

  return (
    <AntMenu
      theme={theme}
      openKeys={openKeys}
      selectedKeys={[activeKey]}
      mode={mode}
      className={className}
      onOpenChange={onOpenChange}
      items={menuItems}
    />
  );
};

export default BaseMenu;

function isShowChildren(route: AppRoute) {
  if (route.meta?.menu === undefined) {
    return true;
  }

  if (typeof route.meta.menu === "boolean") {
    return route.meta.menu;
  }

  return route.meta.menu.showChildren ?? true;
}

function isShowSelf(route: AppRoute) {
  if (route.meta?.menu === undefined) {
    return true;
  }

  if (typeof route.meta.menu === "boolean") {
    return route.meta.menu;
  }

  return route.meta.menu.show ?? true;
}
