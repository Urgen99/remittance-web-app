import { Checkbox } from "../checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

interface CheckBoxProps {
  name: string;
  label: string;
  isImportant: boolean;
  control: any;
}

const CheckBox = ({ name, label, isImportant, control }: CheckBoxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-3">
          <FormControl>
            <Checkbox
              className="data-[state=checked]:bg-[#3333C1] size-[22px]"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="font-roboto font-normal leading-6 tracking-[-1%]">
            <span className="text-[#696969]">{label} </span>
            {isImportant && <span className="text-[#D32F2F]">*</span>}
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckBox;
