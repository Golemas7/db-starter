import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { childrenShape } from "app/shapes";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "pages/LoadingPage";
import { DEFAULT_LOCALE } from "./constants";
import { initLocale, loadMessages } from "./slice";
import {
  selectLocale,
  selectLocaleInitialising,
  selectLocaleMessages,
  selectLocaleError,
} from "./selectors";

function LanguageProvider({ children }) {
  const locale = useSelector(selectLocale);
  const localeInitialising = useSelector(selectLocaleInitialising);
  const dispatch = useDispatch();
  const messages = useSelector(selectLocaleMessages);
  const error = useSelector(selectLocaleError);
  const needInit = !locale && !localeInitialising;

  useEffect(() => {
    if (needInit) {
      dispatch(initLocale());
    }
  });

  useEffect(() => {
    if (!needInit) {
      window.document.documentElement.lang = locale;
    }
  }, [locale, needInit]);

  useEffect(() => {
    if (!needInit && !messages) {
      dispatch(loadMessages(locale));
    }
  }, [needInit, locale, messages, dispatch]);

  if (needInit || (!messages && !error)) {
    return <LoadingPage />;
  }

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
      wrapRichTextChunksInFragment
    >
      {children}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  children: childrenShape,
};

export default LanguageProvider;
