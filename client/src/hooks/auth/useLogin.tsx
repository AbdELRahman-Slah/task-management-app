import { User } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/components/login/LoginForm";

const API_URL = import.meta.env.VITE_API_URL;

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: LoginFormSchema) => {
      return axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });
    },
    onSuccess: (data: { data: { data: { user: User } } }) => {
      navigate("/dashboard");

      toast({
        title: "Welcome back!",
        description: "Successfully signed in to TaskFlow",
      });
    },

    onError: () => {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });

      navigate("/");
    },

    // onSettled: () => {

    // },
  });
};

export default useLogin;
