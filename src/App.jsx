import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Setting from './Pages/Setting';
import Profile from './Pages/Profile';

function App() {
  return (
    <div className='phone-wrapper'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='SignUp' element={<SignUp />}/>
          <Route path='Home' element={<Home />}/>
          <Route path='ErrorPage' element={<ErrorPage />}/>
          <Route path='Setting' element={<Setting />} />
          <Route path='Profile' element={<Profile />} />
        </Routes>
    </div>
  );
}

export default App;

// use zustand to manage state and see if it can be passed through child?