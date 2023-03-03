import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Home } from "./Home";
import { Login } from "./Login";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";

const authService: AuthService = new AuthService();

export const App: React.FC<{}> = () => {
  const [user, setUser] = useState<User>();

  return ( 
    <div className="wrapper">
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path='/login' element={ <Login authService={authService} setUser={setUser} /> } />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
};
