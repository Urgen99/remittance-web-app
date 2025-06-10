interface ExchangeRate {
  currency: string;
  amount: number;
  code: string;
}
const ExchangeRate: React.FC<ExchangeRate> = ({ currency, amount, code }) => {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="font-inter font-[475] text-[#4F4D55] text-sm tracking-[-0.05px]">
        {currency}
      </h6>
      <h4 className="font-general-sans font-medium text-xl tracking-[-1%] text-[#1b1b1b]">
        {amount} {code}
      </h4>
    </div>
  );
};

export default ExchangeRate;
