import {Role} from './role';

export interface User {
  username: string;
  password: string;
  email: string;
  id?: number;
  roles?: Role;
}
