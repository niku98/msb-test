declare global {
  type Layout = "Blank" | "Main" | "Profile";

  interface PageMeta {
    layout?: Layout;
  }
}

export {};
