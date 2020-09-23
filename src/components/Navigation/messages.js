import { defineMessages } from "react-intl";
const scope = "components.navigation.";

export default defineMessages({
  linkHome: {
    id: `${scope}linkHome`,
    defaultMessage: "Home",
  },
  linkCounter: {
    id: `${scope}linkCounter`,
    defaultMessage: "Counter ({count})",
  },
  linkIntl: {
    id: `${scope}linkIntl`,
    defaultMessage: "Intl demo",
  },
  linkNpm: {
    id: `${scope}linkNpm`,
    defaultMessage: "API demo",
  },
});
