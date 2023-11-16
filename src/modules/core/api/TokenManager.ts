export interface TokenManagerOptions {
  storage?: Storage;
  key?: string;
}

const defaultOptions: Required<TokenManagerOptions> = {
  storage: localStorage,
  key: "app_tokens",
};

class TokenManager<Types extends string = TokenTypes> {
  private storage: Storage;
  private key: string;
  private tokens: Record<string, string> = {};

  constructor(options: TokenManagerOptions = defaultOptions) {
    const mergedOptions = Object.assign({}, defaultOptions, options);
    this.storage = mergedOptions.storage;
    this.key = mergedOptions.key;
    this.restore();
  }

  getToken(type: Types) {
    return this.tokens[type] || "";
  }

  setToken(type: Types, token: string) {
    this.tokens[type] = token;
    this.persist();
  }

  persist() {
    this.storage.setItem(this.key, JSON.stringify(this.tokens));
  }

  restore() {
    try {
      this.tokens = JSON.parse(this.storage.getItem(this.key) || "{}");
    } catch (error) {
      this.tokens = {};
    }

    return this.tokens;
  }

  sync() {
    const tokens = JSON.parse(this.storage.getItem(this.key) || "{}");
    this.tokens = Object.assign({}, tokens, this.tokens);
    this.persist();
  }
}

export default TokenManager;
