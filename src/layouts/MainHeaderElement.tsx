import MainNavElement from "src/layouts/MainNavElement";

interface MainHeaderElementProps {}

const MainHeaderElement = (props: MainHeaderElementProps) => {
  return (
    <header
      className={cn(
        "flex justify-between gap-3",
        "py-4 px-10",
        "bg-background"
      )}
    >
      <Link path="/">
        <img src={Assets.Images.logo} className="cursor-pointer" />
      </Link>

      <div className="flex gap-x-6">
        <MainNavElement />
        <Button variant="secondary">Yêu cầu tư vấn</Button>
      </div>
    </header>
  );
};

export default MainHeaderElement;
