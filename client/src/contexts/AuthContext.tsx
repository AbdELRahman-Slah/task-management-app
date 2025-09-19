import { User } from "@/types/user.types";
import { UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";


type AuthContextType = Partial<UseQueryResult<User, Error>> & {
  user?: User;
  invalidateUser: () => void;
  clearUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  invalidateUser: () => {},
  clearUser: () => {},
});

export default AuthContext;
