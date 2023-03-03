import { User } from "../model/Model";

export class AuthService {
  constructor() {
    console.log('rendered')
  }

  public async login( username: string, password: string ): Promise<User | undefined> {
    if (!(username === "user" && password === "1234")) return undefined;

    return { username, email: "some@email.com" };
  }
}
