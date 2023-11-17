import { ReactElement } from "react";
import LoginForm from "src/modules/auth/components/LoginForm";

interface LoginModalProps {
  children?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const LoginModal = ({ children, onOpenChange, open }: LoginModalProps) => {
  const [mergedOpen, setMergedOpen] = useState(open);

  useDidUpdate(() => {
    setMergedOpen(open);
  }, [open]);

  return (
    <Dialog open={mergedOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[343px]" closable={false}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Đăng Nhập</DialogTitle>
        </DialogHeader>
        <LoginForm
          onSuccess={() => {
            setMergedOpen(false);
            onOpenChange?.(false);
          }}
          extra={
            <div className="grid grid-cols-2 gap-4 !mt-6">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </DialogClose>
              <Button type="submit">Đăng nhập</Button>
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
