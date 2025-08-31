import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import {  CardToUpdate } from "@/types/card.types";
import { BoardContext } from "@/contexts/BoardContext";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateMultipleCards = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const mutation = useMutation({
    mutationKey: ["updateMultipleCards"],
    mutationFn: (cards: CardToUpdate[]) => {
      return axios.patch(`${API_URL}/boards/${boardId}/cards`, { cards }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    },
  });

  const updateMultipleCards = (cards: CardToUpdate[]) => {
    setCards((cards) => {
      const updatedCardIds = cards.map((card) => card._id);
      return cards.map(
        (card) =>
          updatedCardIds.includes(card._id)
            ? cards.find((c) => c._id === card._id) // Find the updated card that has the same id as the old card
            : card // Return the old card if it's not updated
      );
    });
    mutation.mutate(cards);
  };

  return { updateMultipleCards, ...mutation };
};

export default useUpdateMultipleCards;
