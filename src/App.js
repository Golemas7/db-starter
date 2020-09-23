import "scss/index.scss";
import Layout from "./components/Layout";
import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "app/routes";
import LanguageProvider from "components/LanguageProvider";
import NotFoundPage from "pages/NotFoundPage";
import LoadingPage from "pages/LoadingPage";

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            {Object.values(routes).map(({ path, getComponent }) => {
              const LazyRouteComponent = lazy(getComponent);
              return (
                <Route
                  key={path}
                  path={path}
                  exact
                  component={LazyRouteComponent}
                />
              );
            })}
            <Route path={"/"} component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Layout>
    </LanguageProvider>
  );
}

export default App;
