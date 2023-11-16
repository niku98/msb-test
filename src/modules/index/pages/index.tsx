import { useForm } from "react-hook-form";

definePageMeta({
  title: "index:index_title",
  menu: {
    title: "index:index_title",
  },
  parentMeta: {
    layout: "Main",
  },
});

const IndexIndexPage = () => {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      username: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default IndexIndexPage;
