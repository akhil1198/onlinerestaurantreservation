import React from 'react';
import history from './services/history'
import { AuthProvider } from './auth/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Test from './components/signup'

//react bootstrap imports 
import { Button } from 'react-bootstrap'
import Home from './components/Home'
import {Landing} from './components/Landing'

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

//auth imports
import PrivateRoute from './routes/privateroutes'

//component imports
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/home" component={Sidebar} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
