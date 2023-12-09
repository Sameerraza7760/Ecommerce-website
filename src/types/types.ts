export interface Iauth {
  email: string;
  password: string;
  username?: string;
  id?: string; // Use "?" to denote that the property is optional
}

export interface User {
  id: string | null;
  email: string | null;
}

export interface UserProfile {
  email?: string;
  userName?: string;
  photurl?: string | null | undefined;
  id?: string;
  phonenumber?: string;
}

export interface Adminauth {
  email: string | null;
  username: string | null;
  id: string | null;
}

export interface Product {
  productName: string;
  productPrice: number|null;
  productDiscription: string;
  productCategory: string;
  productQuantaty: number|null;
  imageUrl: File | undefined | string;
  email: string;
}
