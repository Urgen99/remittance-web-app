import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../button";
import { Calendar } from "../calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
interface DatePickerProps {
  name: string;
  label: string;
  isImportant: boolean;
  control: any;
}
const DatePicker = ({ name, label, isImportant, control }: DatePickerProps) => {
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
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "max-h-12 h-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default DatePicker;
