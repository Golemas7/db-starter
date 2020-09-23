import { defineMessages } from "react-intl";
const scope = "pages.counterPage.";

export default defineMessages({
  plus: {
    id: `${scope}plus`,
    defaultMessage: "Increment value",
  },
  minus: {
    id: `${scope}minus`,
    defaultMessage: "Decrement value",
  },
  setIncrementAmount: {
    id: `${scope}setIncrementAmount`,
    defaultMessage: "Set increment amount",
  },
  addAmount: {
    id: `${scope}addAmount`,
    defaultMessage: "Add Amount",
  },
  addAsync: {
    id: `${scope}addAsync`,
    defaultMessage: "Add Async",
  },
  errorTip: {
    id: `${scope}errorTip`,
    defaultMessage: 'To get an error try adding "0" asynchronously.',
  },
  error: {
    id: `${scope}error`,
    defaultMessage: 'Error: "{error}"',
  },
});
