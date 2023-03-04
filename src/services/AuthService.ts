import { User, UserAttribute } from "../model/Model";

export class AuthService {
  constructor() {
    console.log('rendered')
  }

  public async login( username: string, password: string ): Promise<User | undefined> {
    if (!(username === "user" && password === "1234")) return undefined;

    return { username, email: "some@email.com" };
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    const userAttributes: UserAttribute[] = [];

    userAttributes.push({ Name: "description", Value: "Best User Ever" });
    userAttributes.push({ Name: "job", Value: "Engineer" });
    userAttributes.push({ Name: "age", Value: "32" });
    userAttributes.push({ Name: "experience", Value: "3 years" });

    return userAttributes;
  }
}
