export interface User {
  id: number;
  email: string;
  name: { firstname: string; lastname: string };
  username: string;
  phone: string;
}
