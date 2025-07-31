import { Card } from "./card.types";

export interface List {
  _id: string;
  title: string;
  cards: Card[];
  position: number;
  color: string;
}
export interface ListToUpdate {
  _id: string;
  title?: string;
  cards?: Card[];
  position?: number;
  color?: string;
}

export interface SingleListApiResponse {
  status: string;
  data: {
    list: List;
  };
  message?: string;
}

export interface ListsApiResponse {
  status: string;
  data: {
    lists: List[];
  };
  message?: string;
}

export interface ListsContextType {
  lists: List[];
  setLists: (newLists: List[]) => void;
}