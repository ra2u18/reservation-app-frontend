import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { DataService } from "../services/DataService";

import { Home } from "./Home";
import { Login } from "./Login";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";
import { CreateSpace } from "./spaces/CreateSpace";
import { Spaces } from "./spaces/Spaces";

const authService: AuthService = new AuthService();
const dataService: DataService = new DataService();

export const App: React.FC<{}> = () => {
  const [user, setUser] = useState<User>();

  const handleSetUser = async (user: User) => {
    setUser(user);

    try {
      const creds = await authService.getAWSTemporaryCreds(user.cognitoUser);
      dataService.setCreds(creds);
    } catch (error) {
      console.log('error');
    }
  }

  return ( 
    <div className="wrapper">
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path='/login' element={ <Login authService={authService} setUser={handleSetUser} /> } />
          <Route path='/profile' element={<Profile authService={authService} user={user} />} />
          <Route path='/spaces' element={<Spaces dataService={dataService} />} />
          <Route path='/create-spaces' element={<CreateSpace dataService={dataService} />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
};
