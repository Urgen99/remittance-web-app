import { lazy } from "react";
import { UserSettingsIcons } from "../icons/Icons";

const AccountPrivacy = lazy(() => import("./account-privacy/AccountPrivacy"));
const HelpSupport = lazy(() => import("./get-help/HelpSupport"));
const PersonalInformation = lazy(
  () => import("./personal-information/PersonalInformation")
);
const PrivacyPolicy = lazy(() => import("./privacy-policy/PrivacyPolicy"));
const ReportBug = lazy(() => import("./report-bug/ReportBug"));
const TermsConditions = lazy(
  () => import("./terms-conditions/TermsConditions")
);
const TransactionLimit = lazy(
  () => import("./transaction-limit/TransactionLimit")
);

const tabs = [
  {
    Icon: UserSettingsIcons.UserCircle,
    title: "Personal details",
    value: "personal-details",
    Component: PersonalInformation,
  },
  {
    Icon: UserSettingsIcons.Password,
    title: "Account and Privacy",
    value: "account-and-privacy",
    Component: AccountPrivacy,
  },
  {
    Icon: UserSettingsIcons.DollarCircle,
    title: "Get help",
    value: "get-help",
    Component: HelpSupport,
  },
  {
    Icon: UserSettingsIcons.Warning,
    title: "Report a bug",
    value: "report-a-bug",
    Component: ReportBug,
  },
  {
    Icon: UserSettingsIcons.Block,
    title: "Transaction limit",
    value: "transaction-limit",
    Component: TransactionLimit,
  },
  {
    Icon: UserSettingsIcons.Article,
    title: "Terms and conditions",
    value: "terms-and-conditions",
    Component: TermsConditions,
  },
  {
    Icon: UserSettingsIcons.Shield,
    title: "Privacy policy",
    value: "privacy-policy",
    Component: PrivacyPolicy,
  },
];

export default tabs;
