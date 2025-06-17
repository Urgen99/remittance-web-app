import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface DropDownSelectProps {
  name: string;
  label: string;
  isImportant: boolean;
  control: any;
  items: Items[];
  defaultValue: string | undefined;
  placeholder: string;
}

type Items = {
  value: string | number;
  label: string;
};

const DropDownSelect = ({
  name,
  label,
  isImportant,
  defaultValue,
  control,
  items,
  placeholder,
}: DropDownSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
            {label} {isImportant && <span className="text-[#D32F2F]">*</span>}
          </FormLabel>
          <div className="flex flex-col gap-2 min-h-20">
            <Select onValueChange={field.onChange} defaultValue={defaultValue}>
              <FormControl>
                <SelectTrigger className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map(({ value, label }) => (
                  <SelectItem key={value} value={value.toString()}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default DropDownSelect;
