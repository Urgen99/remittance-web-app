import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { Label } from "../label";
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
  items: Items[];
  defaultValue?: string | undefined;
}

type Items = {
  value: string;
  label: string;
};
const DropDownSelect = ({
  name,
  label,
  isImportant,
  defaultValue,
  items,
}: DropDownSelectProps) => {
  return (
    <FormItem className="flex-1">
      <Label
        // {/* FormLabel */}
        className="font-inter font-[475] text-sm tracking-[-0.05px]"
      >
        {label} {isImportant && <span className="text-[#D32F2F]">*</span>}
      </Label>
      <div className="flex flex-col gap-2 min-h-20">
        <Select
          defaultValue="card"
          // onValueChange={field.onChange}
          //   defaultValue={defaultValue}
        >
          {/* <FormControl> */}
          <SelectTrigger className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12">
            <SelectValue placeholder="Select Document Type" />
          </SelectTrigger>
          {/* </FormControl> */}
          <SelectContent>
            {items.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* <FormMessage /> */}
      </div>
    </FormItem>
  );
};

export default DropDownSelect;
