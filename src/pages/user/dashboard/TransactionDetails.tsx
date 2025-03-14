import TextContainer from "@/components/shared/TextContainer";

const TransactionDetails = () => {
  return (
    <div className="border-2 border-red-500 min-h-screen flex flex-col gap-6">
      <div>
        <TextContainer
          title="Transaction Details"
          subtitle="View the transaction details of selected transactions"
        />
      </div>
    </div>
  );
};

export default TransactionDetails;
