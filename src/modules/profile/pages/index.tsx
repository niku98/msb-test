definePageMeta({
  title: "Thông tin cá nhân",
  parentMeta: {
    layout: "Profile",
    title: "Thông tin cá nhân",
    requiredAuth: true,
  },
});

const ProfileIndexPage = () => {
  const { authState } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin chung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-x-4 text-sm">
          <span className="inline-block w-[120px] text-gray-500">
            Họ và tên
          </span>
          <span>
            {authState.user?.firstName} {authState.user?.lastName}
          </span>
        </div>
        <div className="space-x-4 text-sm">
          <span className="inline-block w-[120px] text-gray-500">
            Địa chỉ email
          </span>
          <span>{authState.user?.email}</span>
        </div>
        <div className="space-x-4 text-sm">
          <span className="inline-block w-[120px] text-gray-500">
            Giới tính
          </span>
          <span>{authState.user?.gender === "female" ? "Nữ" : "Nam"}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileIndexPage;
