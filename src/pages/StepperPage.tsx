import { StepperIcons } from "@/components/icons/Icons";
import Stepper from "@/components/ui/stepper/stepper";
import { JSX } from "react";
import PersonalDetails from "./PersonalDetails";
import SelectDocument from "./SelectDocument";
import UploadDocument from "./UploadDocument";

export interface ProfileCompletionProps {
  step: number;
  name: string;
  Icon: (props: { fill?: string }) => JSX.Element;
  Component: () => JSX.Element;
}

const steps = [
  {
    step: 1,
    name: "Select Document",
    Icon: StepperIcons.SelectDocument,
    Component: UploadDocument,
  },
  {
    step: 2,
    name: "Document Front",
    Icon: StepperIcons.DocumentFront,
    Component: SelectDocument,
  },
  {
    step: 3,
    name: "Document Back",
    Icon: StepperIcons.DocumentBack,
    Component: SelectDocument,
  },
  {
    step: 4,
    name: "Personal Details",
    Icon: StepperIcons.PersonalDetails,
    Component: PersonalDetails,
  },
];

const StepperPage = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="max-w-xl lg:max-w-5xl flex justify-center items-center flex-col gap-5 w-full">
        <Stepper steps={steps as ProfileCompletionProps[]} />
      </div>
    </div>
  );
};

export default StepperPage;
