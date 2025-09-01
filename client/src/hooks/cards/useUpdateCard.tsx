import { BoardContext } from "@/contexts/BoardContext";
import { Card, SingleCardApiResponse } from "@/types/card.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateCard = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: (cardData: Card) =>
      axios.patch<SingleCardApiResponse>(
        `${API_URL}/boards/${boardId}/cards/${cardData._id}`,
        cardData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
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
