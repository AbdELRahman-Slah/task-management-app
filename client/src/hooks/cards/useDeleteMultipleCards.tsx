import { BoardContext } from "@/contexts/BoardContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteMultipleCards = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: (cardIds: string[]) =>
      axios.delete(`${API_URL}/boards/${boardId}/cards`, {
        data: { cardIds },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
  });

  const deleteMultipleCards = (cardIds: string[]) => {
    setCards((cards) => cards.filter((card) => !cardIds.includes(card._id)));
    mutation.mutate(cardIds);
  };

  return { deleteMultipleCards, ...mutation };
};

export default useDeleteMultipleCards;
