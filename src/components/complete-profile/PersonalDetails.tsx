import { PersonalDetailSchema } from "@/lib/formSchema";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FormIcons } from "../icons/Icons";
import { z } from "zod";
import FormHeadingDescription from "../shared/FormHeadingDescription";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import NavigationButtons from "./NavigationButtons";

interface PersonalDetailProps {
  handlePrev: () => void;
}

const PersonalDetails: React.FC<PersonalDetailProps> = ({ handlePrev }) => {
  const [open, setOpen] = React.useState<string | null>(null);
  const form = useForm({
    mode: "all",
    resolver:
      zodResolver<z.infer<typeof PersonalDetailSchema>>(PersonalDetailSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof PersonalDetailSchema>) {
    alert(`data: ${JSON.stringify(data)}`);
  }

  const [selectedDate, setSelectedDate] = React.useState<SelectedDate>({
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
      form.setValue("birthDate", dateObj);
    }
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

  return (
    <main className="mt-7">
      <section className="flex  items-center justify-center">
        <div className="max-w-[50rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />

          {/* ---------- FORM CONTAINER ---------- */}
          <Form {...form}>
            <form
              className="w-full flex flex-col gap-[18px] items-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="w-full flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                        First Name <span className="text-[#D32F2F]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex justify-between font-inter font-[475] text-sm tracking-[-0.05px]">
                        Middle Name{" "}
                        <span className="text-[#7F7D83]">Optional</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your middle name"
                          className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                        Last Name <span className="text-[#D32F2F]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex items-center gap-3">
                <div className="flex flex-col gap-2">
                  <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                    Select your birth date{" "}
                    <span className="text-[#D32F2F]">*</span>
                  </FormLabel>

                  <div className="w-full flex items-center gap-[11px]">
                    {(["year", "month", "day"] as (keyof SelectedDate)[]).map(
                      (type) => (
                        <FormField
                          key={type}
                          control={form.control}
                          name="birthDate"
                          render={() => (
                            <FormItem className="flex flex-col">
                              <Popover
                                open={open === type}
                                onOpenChange={() => setOpen(type)}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    role="combobox"
                                    aria-expanded={open === type}
                                    variant="outline"
                                    className={cn(
                                      "w-[120px] justify-between border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12 ",
                                      !selectedDate[type] &&
                                        "text-muted-foreground"
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
                                              setOpen(null);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedDate[type] ===
                                                  item.label
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
                            </FormItem>
                          )}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="document.type"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                          Document Type{" "}
                          <span className="text-[#D32F2F]">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12">
                              <SelectValue placeholder="Select Document Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="license">
                              Driving License
                            </SelectItem>
                            <SelectItem value="nationalId">
                              National Id
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="document.number"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                        Document Number{" "}
                        <span className="text-[#D32F2F]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg: 123456"
                          className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="document.expiry"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                        Document Expiry Date{" "}
                        <span className="text-[#D32F2F]">*</span>
                      </FormLabel>
                      <FormControl>
                        <DatePicker field={field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                        Enter your city Name{" "}
                        <span className="text-[#D32F2F]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg: Kathmandu"
                          className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.addressLine"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                        Enter the address line*{" "}
                        <span className="text-[#D32F2F]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg:Bhaktpur, Jadibuti"
                          className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83] h-12"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <NavigationButtons
                type="submit"
                onBackClick={handlePrev}
                disabled={!form.formState.isValid}
              />
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default PersonalDetails;

const formDescription: FormDescription = {
  Icon: FormIcons.UserAdd,
  title: "Enter your personal details",
  subtitle:
    "Please enter your personal details below to proceed. Ensure all information is accurate and matches your official identification documents.",
};

const defaultValues: z.infer<typeof PersonalDetailSchema> = {
  firstName: "",
  lastName: "",
  middleName: "",
  birthDate: new Date(),
  document: {
    type: "license",
    number: "",
    expiry: new Date(),
  },
  address: {
    city: "",
    addressLine: "",
  },
};

type SelectedDate = {
  day: string;
  month: string;
  year: string;
};

export function DatePicker({ field }: { field: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
