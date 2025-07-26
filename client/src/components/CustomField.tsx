import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const CustomFormField = ({
  name,
  placeholder,
  control,
}: {
  name: string;
  placeholder: string;
  control: import("react-hook-form").ControllerProps["control"];
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
            className={cn(
              "border",
              fieldState.invalid
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-primary"
            )}
          />
        </FormControl>
        <FormMessage className="text-red-500" />
      </FormItem>
    )}
  />
);
