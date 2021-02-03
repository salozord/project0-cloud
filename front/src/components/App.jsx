import React from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthRoute } from "./utils/AuthRoute";
import { ProvideAuth } from "./auth/AuthHook";

import AuthButton from "./auth/AuthButton";
import EventosPage from "./eventos/EventosPage"
import LoginPage from "./auth/LoginPage";
import RegistroPage from "./auth/RegistroPage";
import './App.scss';

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
              <AuthRoute path="/login">
                <LoginPage />
              </AuthRoute>
              <AuthRoute path="/registro">
                <RegistroPage />
              </AuthRoute>
              <PrivateRoute path="/">
                <EventosPage />
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
