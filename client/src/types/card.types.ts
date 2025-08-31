export interface Card {
  _id: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  listId: string;
  boardId: string;
  position: number;
}

export interface CardToUpdate {
  _id: string;
  title?: string;
  description?: string;
  listId?: string;
  position?: number;
}

export interface CardsApiResponse {
  status: string;
  data: {
    cards: Card[];
  };
  message?: string;
}

export interface SingleCardApiResponse {
  status: string;
  data: {
    card: Card;
  };
  message?: string;
}
