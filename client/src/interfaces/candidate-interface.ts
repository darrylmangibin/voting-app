import { UserInterface } from './user-interface';

interface Vote {
  _id?: string;
  voter: UserInterface;
  candidate?: string;
  createdAt: string;
  updatedAt: string;
  id?: string;
}

export interface CandidateInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  shortName: string;
  createdAt?: string;
  updatedAt?: string;
  votes: Vote[];
  id?: string;
}
