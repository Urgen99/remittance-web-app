/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationButtons from "@/pages/private/complete-profile/components/NavigationButtons";
import { SendMoneyForm } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/lib/type";
import React, { useState } from "react";
import { Recipient, RecipientStep } from "../RecipientDetails";

const formDescription: FormDescription = {
  Icon: SendMoneyForm.ReceiverDetails.ArchiveDown,
  title: "Enter receiver's details",
  subtitle:
    "Since you've already saved the receiver details, you can select an existing one or add a new recipient.",
};

interface RecipientDetailsProps {
  handleNext: () => void;
  handlePrev: () => void;
  recipients: Recipient[];
  onStepChange: (step: RecipientStep) => void;
}

const SavedRecipients = ({
  recipients,
  handleNext,
  handlePrev,
  onStepChange,
}: RecipientDetailsProps) => {
  const [selectedUser, setSelectedUser] = useState<Recipient | null>(null);

  const handleSelect = (user: Recipient) => {
    setSelectedUser(user);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <section className="flex flex-col gap-6 items-center justify-center">
      <div className="max-w-[33.5rem] flex flex-col gap-14 items-center w-full">
        {/* ---------- FORM DESCRIPTION ---------- */}
        <FormHeadingDescription formDescription={formDescription} />
      </div>

      {/* ---------- FORM CONTAINER ---------- */}
      {/* <FormProvider {...form}> */}
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-[7.5rem] justify-between w-full h-full"
      >
        <div className="space-y-4 max-w-2xl w-full">
          <Button
            onClick={() => onStepChange("enter-recipient-details")}
            type="button"
            variant="ghost"
            className="w-full cursor-pointer bg-[#EBEBF9] text-[#3333C1] font-mukta font-medium leading-7 h-10 pl-1.5 pr-4 !text-base py-1.5 justify-start"
          >
            <div className="size-7 bg-[#FBFBFB] rounded-full flex items-center justify-center">
              <SendMoneyForm.ReceiverDetails.UserAdd />
            </div>
            Add different receiver..
          </Button>

          <ul className="space-y-2 max-h-[20rem] overflow-y-scroll h-full">
            {recipients &&
              recipients.map((user) => (
                <li
                  key={Math.random()}
                  onClick={() => handleSelect(user)}
                  className={`cursor-pointer hover:bg-[#EBEBF9] rounded-[6px] border p-4 flex justify-between ${
                    selectedUser === user
                      ? "border-[#3333C1] bg-[#EBEBF9]"
                      : "border-[#0000001A] bg-white"
                  }`}
                >
                  <div className="flex gap-3">
                    <SendMoneyForm.ReceiverDetails.User />
                    <div className="space-y-1">
                      <div className="tracking-[-1%] space-y-1">
                        <h5 className="font-general-sans font-medium leading-5 text-[#222222]">
                          {user.name}
                        </h5>
                        <h6 className="text-[#696969] font-roboto text-sm leading-[18px]">
                          {user.bankName}
                        </h6>
                      </div>

                      <p className="font-mukta leading-[18.2px]">
                        <span className="text-[#1B1B1B] font-medium">
                          Acc no:
                        </span>{" "}
                        <span className="text-[#696969]">
                          {user.accountNumber}
                        </span>
                      </p>
                    </div>
                  </div>
                  {selectedUser === user && (
                    <SendMoneyForm.ReceiverDetails.Check />
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="max-w-[50rem] flex flex-col items-center w-full gap-14">
          <NavigationButtons
            onBackClick={handlePrev}
            //   disabled={!form.formState.isValid}
            type="submit"
            onContinueClick={handleSubmit}
          />
        </div>
      </form>
      {/* <DevTool control={form.control} /> */}
      {/* </FormProvider> */}
    </section>
  );
};

export default SavedRecipients;
