import { toast } from "sonner";

function showSuccess(message: string, description?: string) {
  toast.success(message, {
    description: description || "",
    duration: 3000,
    className:
      "!border-[#E8FFF4] !bg-gradient-to-l !from-[#FFF] !to-[#E8FFF4B5] !text-[#1DBF73]",
    descriptionClassName: "!text-[#1DBF73]",
  });
}

function showError(message: string, description?: string) {
  toast.error(message, {
    description: description || "",
    duration: 3000,
    className:
      "!border-[#FFCDD2] !bg-gradient-to-l !from-[#FFF] !to-[#FFE2E2] !text-[#D32F2F]",
    descriptionClassName: "!text-[#D32F2F]",
  });
}

function showWarning(message: string, description?: string) {
  toast.warning(message, {
    description: description || "",
    duration: 3000,
    className:
      "!border-[#E2E2FF] !bg-gradient-to-br !from-[#FFFF] !to-[#E2E2FF] !text-[#3333C1]",
    descriptionClassName: "!text-[#3333C1]",
  });
}

export { showError, showSuccess, showWarning };
