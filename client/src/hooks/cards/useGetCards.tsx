import { CardsApiResponse } from "@/types/card.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useGetCards = () => {
  const { boardId } = useParams();

  const userToken = localStorage.getItem("token");

  const { cards, setCards } = useContext(BoardContext);

  const query = useQuery({
    queryKey: ["cards", boardId],

    queryFn: () =>
      axios.get<CardsApiResponse>(`${API_URL}/boards/${boardId}/cards/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (query.isSuccess && cards.length === 0) {
      setCards(query.data.cards);
    }
  }, [query, cards, setCards]);

  return { cards, ...query };
};

export default useGetCards;
