import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonalDetailSchema } from "@/lib/formSchema";
import { FormDescription } from "@/lib/type";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PersonalDetails = () => {
  const [open, setOpen] = useState<string | null>(null);
  const form = useForm({
    resolver:
      zodResolver<z.infer<typeof PersonalDetailSchema>>(PersonalDetailSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof PersonalDetailSchema>) {
    alert(`data: ${JSON.stringify(data)}`);
  }

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
                        <Input
                          placeholder="Eg: 2025-12-11"
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

              <Button
                type="submit"
                className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] max-w-[15.5rem] w-full disabled:bg-[#696969] disabled:opacity-100"
                disabled={!form.formState.isValid}
              >
                Continue
              </Button>
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
  birthDate: "",
  document: {
    type: "license",
    number: "",
    expiry: "",
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
