import LoginForm from "src/modules/auth/components/LoginForm";

definePageMeta({
  title: "Đăng nhập",
  layout: "Blank",
});

interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-light flex flex-col gap-6 items-center justify-center">
      <img src={Assets.Images.logo} />
      <div className="bg-white p-5 rounded-lg w-full max-w-sm">
        <h1 className="text-lg font-bold">Đăng nhập</h1>
        <LoginForm
          onSuccess={() => navigate({ path: "/" })}
          extra={
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default LoginPage;
