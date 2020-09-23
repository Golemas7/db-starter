import { defineMessages } from "react-intl";
const scope = "pages.npmRegistryPage.";

export default defineMessages({
  searchForPackage: {
    id: `${scope}searchForPackage`,
    defaultMessage: "Npm registry search",
  },
  inputPackage: {
    id: `${scope}inputPackage`,
    defaultMessage: "Package",
  },
  examplePackages: {
    id: `${scope}examplePackages`,
    defaultMessage: "e.g. {example}",
  },
  buttonSearch: {
    id: `${scope}buttonSearch`,
    defaultMessage: "Search",
  },
  loading: {
    id: `${scope}loading`,
    defaultMessage: "Loading...",
  },
  error: {
    id: `${scope}error`,
    defaultMessage: 'Error: "{error}"',
  },
  name: {
    id: `${scope}name`,
    defaultMessage: "Name",
  },
  description: {
    id: `${scope}description`,
    defaultMessage: "Description",
  },
  keywords: {
    id: `${scope}keywords`,
    defaultMessage: "Keywords",
  },
  homepage: {
    id: `${scope}homepage`,
    defaultMessage: "Homepage",
  },
  creationDate: {
    id: `${scope}creationDate`,
    defaultMessage: "Creation date",
  },
});
