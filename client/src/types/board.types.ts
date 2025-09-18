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

export interface BoardApiResponse {
  status: string;
  data: {
    board: Board;
  };
  message: string;
}

export interface BoardsApiResponse {
  status: string;
  data: {
    boards: Board[];
  };
  message?: string;
}
