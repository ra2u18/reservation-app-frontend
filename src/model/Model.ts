export interface User {
  username: string;
  email: string;
}

export interface UserAttribute {
  Name: string;
  Value: string;
}

export interface Space {
  spaceId: string;
  location: string;
  name: string;
  photoURL?: string;
}