import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { LoginApiResponse } from "@/types/user.types";
import { LoginFormSchema } from "@/components/login/LoginForm";

const API_URL = import.meta.env.VITE_API_URL;

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    LoginApiResponse["data"]["user"],
    AxiosError<LoginApiResponse>,
    LoginFormSchema
  >({
    mutationFn: async (formData: LoginFormSchema) => {
      const res = await axios.post<LoginApiResponse>(
        `${API_URL}/users/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      return res.data.data.user;
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to TaskFlow",
      });

      queryClient.setQueryData(["current-user"], data);
    },

    onError: () => {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    },
  });
};

export default useLogin;
