export interface JwtToken {
  jwt: string;
  userId: number;
  username: string;
  roles: string[];
}
