import { FormIcons } from "@/components/icons/Icons";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormDescription } from "@/lib/type";
import FormHeadingDescription from "../components/shared/FormHeadingDescription";

const SelectDocument = () => {
  return (
    <main className="mt-7">
      <section className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[40.75rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM SELECT ---------- */}
        <div className="max-w-[36.55rem] w-full border-red-500 border-2 flex justify-center">
          {/* Remaining to animate slide  */}
          <Tabs
            defaultValue="front"
            className="flex flex-col items-center gap-5 w-full"
          >
            <TabsList className="!w-fit rounded-full px-1 py-4 grid grid-cols-2 place-content-center !bg-white shadow-sm gap-2.5">
              {tabs.map(({ title, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="font-inter font-[475] px-4 py-[6px] rounded-[20px] !w-full data-[state=active]:!bg-[#3333C1] data-[state=active]:!text-white !bg-[#f7f7f7] !text-sm !text-black"
                >
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Make it generic */}

            <div className="border border-dashed border-[#C9C9CC] px-6 py-8 w-full flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center bg-[#F8F8F8] p-3 rounded-[8px]">
                <FormIcons.UploadFile />
              </div>

              <div className="flex items-center justify-center w-full">
                <Input id="picture" type="file" className="text-center" />
              </div>
              <TabsContent value="front">front</TabsContent>
              <TabsContent value="back">back</TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default SelectDocument;

const formDescription: FormDescription = {
  Icon: FormIcons.Folder,
  title: "Upload front side of document",
  subtitle:
    "To comply with Australian government regulations and verify your status, you are required to submit an approved form of identification. Please select one from the options below.",
};

const tabs = [
  {
    title: "Document Front",
    value: "front",
  },
  {
    title: "Document Back",
    value: "back",
  },
];
