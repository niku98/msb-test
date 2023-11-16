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

  get heroBanner() {
    return {
      get person() {
        return new URL("./images/hero-banner-person.png", import.meta.url).href;
      },
      get people() {
        return {
          get one() {
            return new URL("./images/hero-banner-person-1.png", import.meta.url)
              .href;
          },
          get two() {
            return new URL("./images/hero-banner-person-2.png", import.meta.url)
              .href;
          },
          get three() {
            return new URL("./images/hero-banner-person-3.png", import.meta.url)
              .href;
          },
          get plus() {
            return new URL(
              "./images/hero-banner-person-plus.png",
              import.meta.url
            ).href;
          },
        };
      },
      get task() {
        return new URL("./images/hero-banner-task.png", import.meta.url).href;
      },
      get bg() {
        return new URL("./images/hero-banner-bg.png", import.meta.url).href;
      },
    };
  },

  get products() {
    return {
      get one() {
        return new URL("./images/product-1.png", import.meta.url).href;
      },
      get two() {
        return new URL("./images/product-2.png", import.meta.url).href;
      },
      get three() {
        return new URL("./images/product-3.png", import.meta.url).href;
      },
      get four() {
        return new URL("./images/product-4.png", import.meta.url).href;
      },
      get five() {
        return new URL("./images/product-5.png", import.meta.url).href;
      },
      get six() {
        return new URL("./images/product-6.png", import.meta.url).href;
      },
    };
  },
};

export const Assets = {
  Images,
};
