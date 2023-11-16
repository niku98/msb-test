const useAuth = () => {
  const context = useApp().auth();
  if (!context) {
    throw new Error("useAuth must be used in AppProvider");
  }

  return context;
};

export default useAuth;
