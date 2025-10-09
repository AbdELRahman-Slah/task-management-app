import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { HTMLInputTypeAttribute, useState } from "react";
import { Button } from "../ui/button";

export const PasswordFormField = ({
  control,
  className,
}: {
  control: import("react-hook-form").ControllerProps["control"];
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <FormField
      control={control}
      name={"password"}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={"Password"}
                autoComplete="off"
                className={cn(
                  "border",
                  fieldState.invalid
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-primary",
                  className
                )}
                type={showPassword ? "text" : "password"}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute size-8 rounded-full right-0 top-1/2 -translate-x-3 -translate-y-1/2"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
