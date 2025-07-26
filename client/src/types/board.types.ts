export interface Board {
  _id: string;
  title: string;
  users: [
    {
      id: string;
      role: string;
    }
  ];
  background: string;
  createdAt: string;
  updatedAt: string;
}
