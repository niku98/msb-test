import AdviceRequestForm, {
  AdviceRequestFormRef,
} from "src/modules/adviceRequest/components/AdviceRequestForm";

interface AdviceRequestSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AdviceRequestSheet = ({
  open,
  onOpenChange,
}: AdviceRequestSheetProps) => {
  const [mergedOpen, setMergedOpen] = useState(open);
  const formRef = useRef<AdviceRequestFormRef>(null);

  useDidUpdate(() => {
    setMergedOpen(open);
  }, [open]);

  return (
    <Sheet
      open={mergedOpen}
      onOpenChange={(opened) => {
        setMergedOpen(opened);
        onOpenChange?.(opened);
      }}
    >
      <SheetContent className="w-[500px] sm:max-w-[500px] overflow-auto flex flex-col">
        <SheetHeader className="">
          <SheetTitle>Yêu cầu tư vấn</SheetTitle>
        </SheetHeader>

        <div className="p-4 flex-grow">
          <h4 className="text-lg font-medium mb-4">Thông tin khách hàng</h4>

          <AdviceRequestForm
            ref={formRef}
            onSuccess={() => {
              setMergedOpen(false);
              onOpenChange?.(false);
            }}
          />
        </div>
        <div className="p-4 border-t">
          <Button className="w-full" onClick={() => formRef.current?.submit()}>
            Xác nhận
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdviceRequestSheet;
