import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

export const CustomFormField = ({
  name,
  placeholder,
  control,
  className,
  type,
}: {
  name: string;
  placeholder: string;
  control: import("react-hook-form").ControllerProps["control"];
  className?: string;
  type?: HTMLInputTypeAttribute;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel>{placeholder}</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            autoComplete="off"
            className={cn(
              "border",
              fieldState.invalid
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-primary",
              className
            )}
            type={type}
          />
        </FormControl>
        <FormMessage className="text-red-500" />
      </FormItem>
    )}
  />
);
