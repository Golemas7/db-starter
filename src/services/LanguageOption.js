import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import React from "react";

function LanguageOption({ locale }) {
  const intl = useIntl();
  return (
    <option value={locale} lang={intl.locale}>
      {intl.formatDisplayName(locale, {
        type: "language",
      })}
    </option>
  );
}

LanguageOption.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default LanguageOption;
