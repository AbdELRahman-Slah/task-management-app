import { LoginApiResponse, User } from "@/types/user.types";
import {
  useQueryClient,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useGetCurrentUser = () => {
  const queryClient = useQueryClient();

  const apiRequest = useApiRequest();

  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await apiRequest<LoginApiResponse>(
        `${API_URL}/users/current-user`,
        {
          method: "GET",
          withCredentials: true,
        }
      );

      return response.data.data.user;
    },
    retry: 0,
  });

  const invalidateUser = () => {
    queryClient.invalidateQueries({
      queryKey: ["current-user"],
    });
  };

  const clearUser = () => {
    queryClient.removeQueries({
      queryKey: ["current-user"],
    });

    queryClient.clear();
  };

  return {
    ...query,

    user: query.data,
    invalidateUser,
    clearUser,
  };
};

export default useGetCurrentUser;
