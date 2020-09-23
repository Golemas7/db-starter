import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import "./home.scss";
import routes from "app/routes";
import { ReactComponent as Logo } from "assets/logo.svg";
import messages from "./messages";

function Home() {
  const intl = useIntl();
  return (
    <div className="home">
      <header className="home__header">
        <Logo className="home__logo" />
        <p>
          {intl.formatMessage(messages.checkOutCounter, {
            // eslint-disable-next-line react/display-name
            a: (...chunks) => (
              <Link to={routes.counter.path} className="home__link">
                {chunks}
              </Link>
            ),
          })}
        </p>
        <a
          className="home__link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.formatMessage(messages.learnReact)}
        </a>
      </header>
    </div>
  );
}

export default Home;
