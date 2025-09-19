import AuthContext from "@/contexts/AuthContext";
import useGetCurrentUser from "@/hooks/auth/useGetCurrentUser";

const AuthContextProvider = ({ children }) => {
  

  const value = useGetCurrentUser();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
