import { ComponentProps, ComponentType, LazyExoticComponent } from "react";

interface LazyComponentProps<C extends ComponentType<any>> {
  component: LazyExoticComponent<C>;
  props?: ComponentProps<C>;
}

function LazyComponent<C extends ComponentType<any>>({
  component: Component,
  props,
}: LazyComponentProps<C>) {
  return <Component {...(props as ComponentProps<C>)} />;
}

export default LazyComponent;
