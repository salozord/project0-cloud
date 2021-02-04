import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthRoute } from "./utils/AuthRoute";
import { ProvideAuth } from "./auth/AuthHook";

import AuthButton from "./auth/AuthButton";
import EventosPage from "./eventos/EventosPage"
import LoginPage from "./auth/LoginPage";
import RegistroPage from "./auth/RegistroPage";
import './App.scss';
import NotFound from "./utils/NotFound";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="main-container">

          <nav>
            <div className="app-name">
              <Link to="/">Mis Eventos</Link>
            </div>
            <AuthButton />
          </nav>

          <div className="container">
            <Switch>
              <PrivateRoute exact path="/">
                <EventosPage />
              </PrivateRoute>
              <AuthRoute path="/login">
                <LoginPage />
              </AuthRoute>
              <AuthRoute path="/registro">
                <RegistroPage />
              </AuthRoute>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
