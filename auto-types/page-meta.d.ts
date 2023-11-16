declare global {
  interface PageMeta<Title extends string = ""> {
    /**
     * Define meta for parent routes.
     * Only use in index page
     */
    parentMeta?: PageMeta<Title>;
  }

  declare function definePageMeta<Title extends string = "">(
    meta: PageMeta<Title>
  ): void;
}

export {};
