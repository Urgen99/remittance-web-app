/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "../button";
import { Command, CommandGroup, CommandItem, CommandList } from "../command";
import { FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { useState } from "react";

interface DateSelectorProps {
  name: string;
  label: string;
  isImportant: boolean;
  form: any;
}

type SelectedDate = {
  day: string;
  month: string;
  year: string;
};

const days = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1).padStart(2, "0"),
}));
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1).padStart(2, "0"),
}));
const years = Array.from({ length: 100 }, (_, i) => ({
  value: 2025 - i,
  label: String(2025 - i),
}));

const DateSelector = ({
  name,
  label,
  isImportant,
  form,
}: DateSelectorProps) => {
  const [open, setOpen] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    day: "",
    month: "",
    year: "",
  });

  const handleSelect = (type: keyof SelectedDate, value: string) => {
    const newDate = { ...selectedDate, [type]: value };
    setSelectedDate(newDate);
    if (newDate.day && newDate.month && newDate.year) {
      const formattedDate = `${newDate.year}/${newDate.month}/${newDate.day}`;
      const dateObj = new Date(
        formattedDate.replace(/(\d{4})\/(\d{2})\/(\d{2})/, "$1-$2-$3")
      );
      form.setValue(name, dateObj);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
        {label} {isImportant && <span className="text-[#D32F2F]">*</span>}
      </FormLabel>

      <div className="w-full flex items-center gap-[11px]">
        {(["year", "month", "day"] as (keyof SelectedDate)[]).map((type) => (
          <FormField
            key={type}
            control={form.control}
            name={name}
            render={() => (
              <FormItem className="flex flex-col">
                <div className="flex flex-col gap-2 min-h-20">
                  <Popover
                    // open={open === type}
                    onOpenChange={() => setOpen(type)}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        role="combobox"
                        aria-expanded={open === type}
                        variant="outline"
                        className={cn(
                          "w-[108px] md:w-[120px] justify-between border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12",
                          !selectedDate[type] && "text-muted-foreground"
                        )}
                      >
                        {selectedDate[type] ||
                          `${
                            type === "year"
                              ? "YY"
                              : type === "month"
                              ? "MM"
                              : "DD"
                          }`}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {(type === "year"
                              ? years
                              : type === "month"
                              ? months
                              : days
                            ).map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.label}
                                onSelect={() => {
                                  handleSelect(type, item.label);
                                  // setOpen(null);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedDate[type] === item.label
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
