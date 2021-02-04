import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthRoute } from "./utils/AuthRoute";
import { ProvideAuth } from "./auth/AuthHook";

import AuthButton from "./auth/AuthButton";
import { EventosDetail , EventosEdit } from "./eventos/EventosDetail";
import LoginPage from "./auth/LoginPage";
import RegistroPage from "./auth/RegistroPage";
import './App.scss';
import NotFound from "./utils/NotFound";
import EventosList from "./eventos/EventosList";
import EventosCreate from "./eventos/EventosCreate";
import { ProvideEventos } from "./eventos/EventosHook";

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

                <ProvideEventos>
                  <PrivateRoute exact path="/">
                    <main className="eventos-section">
                      <EventosList />
                    </main>
                  </PrivateRoute>
                  <PrivateRoute exact path="/crear">
                    <main className="eventos-section">
                      <EventosCreate />
                    </main>
                  </PrivateRoute>
                  <PrivateRoute exact path="/detalle/:eventoId">
                    <main className="eventos-section">
                      <EventosDetail />
                    </main>
                  </PrivateRoute>
                  <PrivateRoute exact path="/editar/:eventoId">
                    <main className="eventos-section">
                      <EventosEdit />
                    </main>
                  </PrivateRoute>
                </ProvideEventos>

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
