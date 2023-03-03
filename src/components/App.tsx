import React, { useState } from "react";

import { Login } from "./Login";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";

const authService: AuthService = new AuthService();

export const App: React.FC<{}> = () => {
  const [user, setUser] = useState<User>({} as User);

  return <div>
    <Login authService={authService} />
  </div>;
};
