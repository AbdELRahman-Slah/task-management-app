import { BoardContext } from "@/contexts/BoardContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteCard = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);
  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (cardId: string) =>
      apiRequest(`${API_URL}/boards/${boardId}/cards/${cardId}`, {
        method: "DELETE",
      }),
  });

  const deleteCard = (cardId: string) => {
    setCards((cards) => cards.filter((card) => card._id !== cardId));
    mutation.mutate(cardId);
  };

  return { deleteCard, ...mutation };
};

export default useDeleteCard;
