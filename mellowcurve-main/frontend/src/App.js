
import React from 'react'
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom'
import Landing from './components/pages/Landing'
import Upload from './components/pages/Upload'
import Home from './components/pages/Home'
import Library from './components/pages/Library'
import CreateAccount from './components/pages/CreateAccount'

import './App.scss';

function App() {
  return (
    <div className="home-container" style={{height: "100vh"}}>
      <Router>
        <Routes>
          <Route path={'/library'} element={< Library />}></Route>
          <Route path={'/home'} element={< Home />}></Route>
          <Route path={'/upload'} element={< Upload />}></Route>
          <Route path={'/createaccount'} element={< CreateAccount />}></Route>
          <Route path={'/'} element={< Landing />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
