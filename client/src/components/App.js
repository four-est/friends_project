import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";

import LandingPage from "./views/LandingPage/LandingPage.js";

import TranslationPage from './views/TranslationPage/TranslationPage.js';

import RecommendPage from './views/RecommendPage/RecommendPage.js';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <a href='/' style={{textDecoration: 'none'}}>
          <div style={{ width: '100%', height: '100px', backgroundColor: '#0E4A84' }}>
            <p style={{ fontSize: '20px', color: '#fff', textAlign: 'center', paddingTop: '30px', margin: 0 }}>FRIEND'S</p>
          </div>
        </a>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, null)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/translation" component={Auth(TranslationPage, true)} />
          <Route exact path="/recommend" component={Auth(RecommendPage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
