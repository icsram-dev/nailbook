export type UserRole = "ADMIN" | "CUSTOMER";

export type UserItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
};