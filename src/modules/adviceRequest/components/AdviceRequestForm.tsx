import { zodResolver } from "@hookform/resolvers/zod";
import { ForwardedRef } from "react";
import { useForm } from "react-hook-form";
import {
  AdviceRequest,
  Gender,
} from "src/modules/adviceRequest/models/AdviceRequest";
import AdviceRequestRepository from "src/modules/adviceRequest/repositories/AdviceRequestRepository";
import { useToast } from "src/modules/common/components/ui/use-toast";
import ProductRepository from "src/modules/products/repositories/ProductRepository";
import * as z from "zod";

interface AdviceRequestFormProps {
  onSuccess?: () => void;
}

export interface AdviceRequestFormRef {
  submit: () => void;
}

const adviceRequestSchema = z.object({
  name: z.string(),
  phone: z.string(),
  city: z.string(),
  district: z.string(),
  description: z.string(),
  gender: z.enum([Gender.Female, Gender.Male]),
  products: z.array(z.union([z.string(), z.number()])),
});

const AdviceRequestForm = forwardRef(
  (
    { onSuccess }: AdviceRequestFormProps,
    ref: ForwardedRef<AdviceRequestFormRef>
  ) => {
    // Handle fetch products
    const { data: productResponse, isInitialLoading } = useObxQuery({
      queryKey: ["products"],
      queryFn: () => {
        return ProductRepository.getList();
      },
      showLoading: false,
    });

    // Handle submit form
    const form = useForm<AdviceRequest>({
      resolver: zodResolver(adviceRequestSchema),
      defaultValues: {
        products: [],
      },
    });

    const { toast } = useToast();
    const loginMutation = useObxMutation({
      mutationFn: (data: AdviceRequest) => {
        console.log(data);

        return AdviceRequestRepository.create(data);
      },
      async onSuccess() {
        toast({
          title: "Gửi yêu cầu thành công!",
        });
        onSuccess?.();
      },
      onError() {
        toast({
          title: "Gửi yêu cầu không thành công!",
          description: "Vui lòng kiểm trả lại thông tin yêu cầu.",
          variant: "destructive",
        });
      },
      showLoading: "loading",
    });

    const submit = form.handleSubmit(
      (values) => {
        loginMutation.mutate(values);
      },
      (error) => {
        console.log("Error", error);
      }
    );

    useImperativeHandle(ref, () => {
      return { submit };
    });

    return (
      <Form {...form}>
        <form onSubmit={submit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập họ và tên" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thành phố</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HN">Hà Nội</SelectItem>
                        <SelectItem value="DN">Đà Nẵng</SelectItem>
                        <SelectItem value="HCM">Hồ Chí Minh</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="D1">District 1</SelectItem>
                        <SelectItem value="D2">District 2</SelectItem>
                        <SelectItem value="D3">District 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    className="flex gap-20 !mt-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={Gender.Male} id="r1" />
                      <Label htmlFor="r1">Nam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={Gender.Female} id="r2" />
                      <Label htmlFor="r2">Nữ</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="products"
            render={() => (
              <FormItem>
                <FormLabel>Sản phẩm cần tư vấn</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {productResponse?.data?.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="products"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.title}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chúng tôi có thể hỗ trợ gì cho bạn?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập thông tin"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
);

export default AdviceRequestForm;
