import useStepper from "@/hooks/stepper";
import EditDocuments from "./EditDocuments";
import UserDetails from "./UserDetails";

export type DocumentProps = {
  type: string;
  number: string;
  expiryDate: string;
  image: { side: string; src: string }[];
};
const documents: DocumentProps = {
  type: "Driving License",
  number: "123456789",
  expiryDate: "2023-12-31",
  image: [
    {
      side: "front",
      src: "/images/documentFront.png",
    },
    {
      side: "back",
      src: "/images/documentBack.png",
    },
  ],
};
const PersonalInformation = () => {
  const { activeStep, handleNext, handlePrev } = useStepper("user-details");

  return (
    <>
      {activeStep === "user-details" && (
        <UserDetails documents={documents} handleNext={handleNext} />
      )}
      {activeStep === "edit-documents" && (
        <EditDocuments documents={documents} handlePrev={handlePrev} />
      )}
    </>
  );
};

export default PersonalInformation;
