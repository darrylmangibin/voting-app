import { VoteInterface } from "interfaces";

export enum UserRole {
  VOTER = 'voter',
  ADMIN = 'admin',
}

export interface UserInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  fullName: string;
  vote: VoteInterface | null
}
