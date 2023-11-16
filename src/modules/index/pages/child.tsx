definePageMeta({
  title: "index:child_title",
  menu: {
    title: "index:child_title",
  },
});

const IndexChildPage = () => {
  const { t } = useTranslation();

  return <>{t("index:child_title")}</>;
};

export default IndexChildPage;
