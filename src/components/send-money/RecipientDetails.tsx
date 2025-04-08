import SavedRecipients from "./recipient-details/SavedRecipients";

interface RecipientDetailsProps {
  handleNext: () => void;
  handlePrev: () => void;
}

const RecipientDetails = ({
  handleNext,
  handlePrev,
}: RecipientDetailsProps) => {
  return (
    <main className="mt-7 ">
      <SavedRecipients handleNext={handleNext} handlePrev={handlePrev} />
    </main>
  );
};

export default RecipientDetails;
