export interface Iauth {
  email: string;
  password: string;
  username?: string; // Use "?" to denote that the property is optional
}

export interface User {
  id: string | null;
  email: string | null;
}

export interface UserProfile {
  email?: string;
  userName?: string;
  photurl?: string  | null | undefined;
  id?: string;
}
