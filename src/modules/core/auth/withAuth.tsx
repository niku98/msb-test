import { ComponentProps, ComponentType } from "react";

export default function withPermissions<C extends ComponentType<any>>(
  permissions: string | string[]
): (component: C) => C {
  return (Component: C) => {
    return ((props: ComponentProps<C>) => {
      const context = useApp().auth();

      return <>{context.can(permissions || []) && <Component {...props} />}</>;
    }) as C;
  };
}
