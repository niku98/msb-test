import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import AuthRepository from "src/modules/auth/repositories/AuthRepository";
import { useToast } from "src/modules/common/components/ui/use-toast";
import * as z from "zod";

interface LoginFormProps {
  onSuccess?: () => void;
  extra?: ReactNode;
}

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type Credentials = z.infer<typeof loginSchema>;

const LoginForm = ({ onSuccess, extra }: LoginFormProps) => {
  const form = useForm<Credentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const auth = useAuth();
  const { toast } = useToast();

  const loginMutation = useObxMutation({
    mutationFn: (data: Credentials) => {
      return AuthRepository.login(data);
    },
    async onSuccess(response) {
      await auth.login({
        accessToken: response.data.token,
        user: _omit(response.data, "token"),
      });
      toast({
        title: "Đăng nhập thành công!",
      });
      onSuccess?.();
    },
    onError() {
      toast({
        title: "Đăng nhập không thành công!",
        description: "Tên đăng nhập hoặc mật khẩu không chính xác.",
        variant: "destructive",
      });
    },
    showLoading: "loading",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          loginMutation.mutate(values);
        })}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tài khoản</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên tài khoản" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mật khẩu" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {extra}
      </form>
    </Form>
  );
};

export default LoginForm;
