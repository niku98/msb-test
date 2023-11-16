declare global {
  type Layout = "Dashboard" | "Main";

  interface PageMeta {
    layout?: Layout;
  }
}

export {};
