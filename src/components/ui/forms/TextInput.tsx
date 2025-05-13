import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";

interface TextInputProps {
  name: string;
  label: string;
  isImportant: boolean;
  control: any;
  placeholder: string;
  type?: string;
}

const TextInput = ({
  name,
  label,
  isImportant,
  control,
  placeholder,
  type,
}: TextInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel
            className={`font-inter font-[475] text-xs sm:text-sm tracking-[-0.05px] transition-all ease-in-out duration-300 ${
              !isImportant ? "flex justify-between" : ""
            }`}
          >
            {label}{" "}
            <span
              className={`${isImportant ? "text-[#D32F2F]" : "text-[#7F7D83]"}`}
            >
              {isImportant ? "*" : "Optional"}
            </span>
          </FormLabel>
          <div className="flex flex-col gap-1 sm:gap-2 min-h-[4.5rem] sm:min-h-20 transition-all ease-in-out duration-300">
            <FormControl>
              <Input
                type={type || "text"}
                placeholder={placeholder}
                className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-11 sm:h-12 transition-all ease-in-out duration-300"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm transition-all ease-in-out duration-300" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TextInput;
