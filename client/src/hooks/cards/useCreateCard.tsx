import { Card, SingleCardApiResponse } from "@/types/card.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useCreateCard = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: (cardData: Card) => {
      const cardWithoutId = { ...cardData };
      delete cardWithoutId._id;

      return axios.post<SingleCardApiResponse>(
        `${API_URL}/boards/${boardId}/cards`,
        cardWithoutId,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    },
    onSuccess: (data, card) => {
      toast({
        title: "Card was added successfully",
        variant: "destructive",
      });

      setCards((cards) => {
        const TempCreatedCardId = card._id;

        const cardsWithoutNewCard = cards.filter(
          (card) => card._id !== TempCreatedCardId
        );

        return [...cardsWithoutNewCard, data.data.data.card];
      });
    },
  });

  const createCard = (card: Card) => {
    setCards((cards) => [...cards, card]);

    mutation.mutate(card);
  };

  return { createCard, ...mutation };
};

export default useCreateCard;
