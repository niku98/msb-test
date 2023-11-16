declare module "app-env" {
  interface ENV {
    appName: string;
    apiUrl: string;
    apiVersion: string;
    defaultPageSize: number;
    userNodeEnv: string;
  }

  const appEnv: ENV;
  export default appEnv;
}
