import { Card } from "@/types/card.types";
import { List } from "@/types/list.types";
import { useState } from "react";
import { BoardContext } from "@/contexts/BoardContext";
import { Board } from "@/types/board.types";

const BoardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  return (
    <BoardContext.Provider
      value={{
        lists,
        setLists,
        cards,
        setCards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
