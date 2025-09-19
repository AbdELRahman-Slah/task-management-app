export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginApiResponse {
  status: string;
  data: { user: User };
  message?: string;
}
