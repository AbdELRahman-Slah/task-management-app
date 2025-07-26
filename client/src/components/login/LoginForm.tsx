import { Button } from "../ui/button";
import z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types/user.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "../CustomField";
import { Form } from "../ui/form";

const API_URL = import.meta.env.VITE_API_URL;

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters long"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: LoginFormSchema) => {
      return axios.post(`${API_URL}/users/login`, formData);
    },
    onSuccess: (data: { data: { data: { token: string; user: User } } }) => {
      localStorage.setItem("token", data.data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.data.user));

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
    },
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          name="email"
          placeholder="Email"
          control={form.control}
        />
        <CustomFormField
          name="password"
          placeholder="Password"
          control={form.control}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-primary shadow-primary"
        >
          Login
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
