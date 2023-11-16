interface AppStateProps {
  title: string;
  subTitle: string;
  status: number;
}

const AppState = ({ title, subTitle, status }: AppStateProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-destructive text-9xl font-bold">{status}</h2>
      <h1 className="text-3xl font-bold">{title}</h1>
      <h3>{subTitle}</h3>
    </div>
  );
};

export default AppState;
