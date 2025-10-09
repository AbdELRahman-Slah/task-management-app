import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../ui/form";
import { User } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import z from "zod";
import { CustomFormField } from "../global/CustomField";
import { PasswordFormField } from "../global/PasswordFormfield";
import { CircleX } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const registerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name too short")
    .max(20, "First name too long"),
  lastName: z
    .string()
    .min(2, "Last name too short")
    .max(20, "Last name too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters long"),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const SignupForm = () => {
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationFn: (formData: RegisterFormSchema) => {
      return axios.post(`${API_URL}/users/register`, formData);
    },

    onSuccess: (data: { data: { data: { token: string; user: User } } }) => {
      toast({
        title: "Account created successfully!",
        description: "Welcome to TaskFlow",
      });

      localStorage.setItem("token", data.data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.data.user));

      navigate("/dashboard");
    },

    onError: (error: { response: { data: { message: string } } }) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterFormSchema) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <CustomFormField
              name="firstName"
              placeholder="First Name"
              control={form.control}
            />
            <CustomFormField
              name="lastName"
              placeholder="Last Name"
              control={form.control}
            />
          </div>

          <CustomFormField
            name="email"
            placeholder="Email"
            control={form.control}
          />
          <PasswordFormField control={form.control} />
        </div>

        {isError && (
          <div className="rounded-sm bg-destructive text-destructive-foreground flex flex-row items-center gap-3 py-4 px-4 opacity-95 border">
            <div>
              <CircleX size={20} />
            </div>
            <p>{error.response.data.message}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-primary shadow-primary mt-3"
        >
          Create Account
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
