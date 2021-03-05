import {Authority} from './authority';

export interface AuthenticationResponse {
  jwt: string;
  userId: number;
  username: string;
  tokenExpiration: Date;
  authorities: Authority[];
}
