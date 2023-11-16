const Images = {
  get errors() {
    return {
      get accessDenied() {
        return new URL("./images/access_denied.svg", import.meta.url).href;
      },
      get default() {
        return new URL("./images/error.svg", import.meta.url).href;
      },
      get notFound() {
        return new URL("./images/404.svg", import.meta.url).href;
      },
    };
  },

  get logo() {
    return new URL("./images/horizontal-logo.png", import.meta.url).href;
  },
};

export const Assets = {
  Images,
};
