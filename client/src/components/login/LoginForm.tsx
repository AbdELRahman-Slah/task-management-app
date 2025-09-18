import { Button } from "../ui/button";
import z from "zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "../global/CustomField";
import { Form } from "../ui/form";
import useLogin from "@/hooks/auth/useLogin";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters long"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { mutate } = useLogin();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormSchema) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
        </div>

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
