import { BoardContext } from "@/contexts/BoardContext";
import { Card, SingleCardApiResponse } from "@/types/card.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateCard = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);

  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (cardData: Card) =>
      apiRequest<SingleCardApiResponse>(
        `${API_URL}/boards/${boardId}/cards/${cardData._id}`,
        {
          method: "PATCH",
          data: cardData,
        }
      ),
  });

  const updateCard = (card: Card) => {
    setCards((cards) => cards.map((c) => (c._id === card._id ? card : c)));
    mutation.mutate(card);
  };

  return { updateCard, ...mutation };
};

export default useUpdateCard;
