import {
  GetKycByUserResponse,
  useGetKycByUserQuery,
} from "@/features/kyc/kycApi.slice";
import { selectUserId } from "@/features/users/users.slice";
import useStepper from "@/hooks/stepper";
import convertTime from "@/utils/convertTimeLeft";
import { useSelector } from "react-redux";
import EditDocuments from "./EditDocuments";
import UserDetails from "./UserDetails";
export type UserData = {
  personalDetails: Data;
  addressDetails: Data;
  documentDetails: Data;
};

type Data = {
  title: string;
  data: { subtitle: string; content: string; side?: string }[];
};

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
  const id = useSelector(selectUserId);

  const {
    data,
    isLoading: idLoading,
    isFetching: idFetching,
  } = useGetKycByUserQuery(id as number);

  console.log("data", data);
  const filteredKycData = data
    ? filterKycData(data?.data as unknown as GetKycByUserResponse)
    : null;

  if (idLoading || idFetching) return <div>Loading...</div>;

  console.log("filtered data", filteredKycData);
  return (
    <>
      {activeStep === "user-details" && (
        <UserDetails
          handleNext={handleNext}
          kycData={filteredKycData as UserData}
        />
      )}
      {activeStep === "edit-documents" && (
        <EditDocuments documents={documents} handlePrev={handlePrev} />
      )}
    </>
  );
};

export default PersonalInformation;

const filterKycData = (kycData: GetKycByUserResponse) => {
  const {
    firstName,
    middleName,
    lastName,
    permanentAddress,
    identityExpiryDate,
    identityNo,
    documents,
  } = kycData;

  // Format Expiry date using date-fns
  const timeLeft = convertTime(identityExpiryDate);

  /**
   * Extract URLs from documents array and add side to each document
   * @example: add side according to index of the array index == 0 ? "front" : "back"
   * @response :[{ url: string, documentType: string }]
   * @return : [{url: string, side: string}]
   */
  const documentUrls: { content: string; side: string; subtitle: string }[] =
    documents.length
      ? documents.map((doc: { url: string; documentType: string }, index) => ({
          content: doc.url,
          side: index === 0 ? "front" : "back",
          subtitle: doc.documentType,
        }))
      : [];

  const documentType = documents[0].documentType;

  const personalDetails = {
    title: "PERSONAL / DOCS INFO",
    data: [
      { subtitle: "FIRST NAME", content: firstName },
      { subtitle: "MIDDLE NAME", content: middleName },
      { subtitle: "LAST NAME", content: lastName },
      { subtitle: "DOCUMENT", content: documentType },
      {
        subtitle: "DOC EXPIRY DATE",
        content: `${identityExpiryDate} (${timeLeft})`,
      },
      { subtitle: "DOCUMENT NO", content: identityNo },
    ],
  };

  const addressDetails = {
    title: "PERMANENT ADDRESS",
    data: [
      { subtitle: "COUNTRY", content: permanentAddress?.country },
      { subtitle: "STREET", content: permanentAddress?.street },
      { subtitle: "CITY", content: permanentAddress?.city },
    ],
  };

  const documentDetails = {
    title: "UPLOADED DOCUMENTS",
    data: documentUrls,
  };

  return {
    personalDetails,
    addressDetails,
    documentDetails,
  };
};
