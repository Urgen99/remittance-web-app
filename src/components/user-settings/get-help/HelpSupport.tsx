import useStepper from "@/hooks/stepper";
import ContactUs from "./ContactUs";
import Faqs from "./Faqs";
import HelpSupportMain from "./HelpSupportMain";

const HelpSupport = () => {
  const { activeStep, handleNext, handlePrev } = useStepper("help-support");
  const handlePrevStep = () => handlePrev("help-support");
  return (
    <>
      {activeStep === "help-support" && (
        <HelpSupportMain handleNext={handleNext} />
      )}
      {activeStep === "faqs" && <Faqs handlePrev={handlePrevStep} />}
      {activeStep === "contact-us" && <ContactUs handlePrev={handlePrevStep} />}
    </>
  );
};

export default HelpSupport;
