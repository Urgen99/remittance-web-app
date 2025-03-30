import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const ContactUs = ({ handlePrev }: { handlePrev: () => void }) => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-transparent size-fit cursor-pointer"
            onClick={handlePrev}
          >
            <DialogSettingsIcons.ChevronLeft />
          </Button>
          <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
            Contact Us
          </h3>
        </div>

        <div className="max-w-[21.85rem] w-full flex flex-col gap-3">
          <Card className="p-4 gap-5">
            <CardHeader className="p-0 gap-4">
              <CardTitle className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#1b1b1b]">
                Call us directly
              </CardTitle>

              <CardContent className="p-0">
                <CardDescription className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#696969]">
                  Call us on number{" "}
                  <Link to="tel:+33 123544123" className="text-[#1b1b1b]">
                    +33 123544123
                  </Link>{" "}
                  or click the button below to copy contact number
                </CardDescription>
              </CardContent>
            </CardHeader>

            <CardFooter className="p-0">
              <Button
                variant="secondary"
                className="bg-[#E0E0E0] hover:bg-[#E0E0E0] cursor-pointer gap-2.5 !h-10 max-w-[9.8rem] justify-start w-full"
              >
                <span className="font-mukta text-base leading-7 font-medium text-[#5F5F5F]">
                  Copy number
                </span>
                <DialogSettingsIcons.MoveRight />
              </Button>
            </CardFooter>
          </Card>

          <Card className="p-4 gap-5">
            <CardHeader className="p-0 gap-4">
              <CardTitle className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#1b1b1b]">
                Contact on whatsapp
              </CardTitle>

              <CardContent className="p-0">
                <CardDescription className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#696969]">
                  Contact our support team on WhatsApp , click the button below
                </CardDescription>
              </CardContent>
            </CardHeader>

            <CardFooter className="p-0">
              <Button className="bg-[#25D366] hover:bg-[#25D366] cursor-pointer justify-start gap-2.5 max-w-[10.3rem] w-full !h-10 items-center">
                <span className="font-mukta text-base leading-7 font-medium text-[#1b1b1b]">
                  Open whatsapp
                </span>
                <DialogSettingsIcons.ChevronRight />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
