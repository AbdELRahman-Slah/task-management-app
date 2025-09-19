import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { LoginApiResponse } from "@/types/user.types";
import { LoginFormSchema } from "@/components/login/LoginForm";

const API_URL = import.meta.env.VITE_API_URL;

const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({
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

      navigate("/");
    },
  });
};

export default useLogin;
