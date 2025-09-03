import { CardsApiResponse } from "@/types/card.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext, useEffect } from "react";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useGetCards = () => {
  const { boardId } = useParams();

  const apiRequest = useApiRequest();

  const { cards, setCards } = useContext(BoardContext);

  const query = useQuery({
    queryKey: ["cards", boardId],

    queryFn: () =>
      apiRequest<CardsApiResponse>(`${API_URL}/boards/${boardId}/cards/`, {
        method: "GET",
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
