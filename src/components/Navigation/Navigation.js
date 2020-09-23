import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider, useIntl } from "react-intl";

import "./navigation.scss";
import routes from "app/routes";
import { ReactComponent as Logo } from "assets/logo.svg";
import { SUPPORTED_LOCALES } from "components/LanguageProvider/constants";
import { setLocale } from "components/LanguageProvider/slice";
import { selectCount } from "pages/CounterPage/selectors";
import LanguageOption from "services/LanguageOption";
import messages from "./messages";

function Navigation() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const intl = useIntl();
  const handleLocaleChange = ({ target: { value } }) => {
    dispatch(setLocale(value));
  };

  const NAV_ITEMS = {
    counter: {
      link: routes.counter.path,
      text: intl.formatMessage(messages.linkCounter, { count }),
    },
    npmApi: {
      link: routes.npmApi.path,
      text: intl.formatMessage(messages.linkNpm),
    },
  };

  return (
    <nav className="navigation">
      <NavLink
        exact
        to={routes.home.path}
        className="navigation__logo-link"
        activeClassName="navigation__logo-link--active"
        title={intl.formatMessage(messages.linkHome)}
      >
        <Logo className="navigation__logo-svg" />
      </NavLink>
      <ul className="navigation__menu">
        {Object.entries(NAV_ITEMS).map(([key, { link, text }]) => (
          <li key={key} className="navigation__menu-item">
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link--is-active"
              to={link}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="navigation__language-menu">
        {/* eslint-disable jsx-a11y/no-onchange */}
        <select
          value={intl.locale}
          onChange={handleLocaleChange}
          data-testid="locale-select"
        >
          {Object.entries(SUPPORTED_LOCALES).map(([key, loc]) => {
            return (
              <IntlProvider key={loc} locale={loc}>
                <LanguageOption locale={loc} />
              </IntlProvider>
            );
          })}
        </select>
      </div>
    </nav>
  );
}

export default Navigation;
