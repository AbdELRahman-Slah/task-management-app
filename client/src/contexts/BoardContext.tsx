import { createContext, Dispatch, SetStateAction } from "react";
import { List } from "@/types/list.types";
import { Card } from "@/types/card.types";

export const BoardContext = createContext<{
  lists: List[];
  setLists: Dispatch<SetStateAction<List[]>>;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}>(null);
