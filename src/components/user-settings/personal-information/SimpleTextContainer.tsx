const SimpleTextContainer = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="py-3 flex justify-between items-center font-roboto font-normal tracking-[-1%]">
      <h4 className="uppercase text-[#696969] text-sm leading-[18px]">
        {title}
      </h4>
      <h6 className="text-[#222222] text-base leading-6 capitalize">
        {content}
      </h6>
    </div>
  );
};

export default SimpleTextContainer;
