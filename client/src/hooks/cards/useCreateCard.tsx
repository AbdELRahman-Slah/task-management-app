import { Card, SingleCardApiResponse } from "@/types/card.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";
import { toast } from "@/hooks/use-toast";
import useApiRequest from "../useApiRequest";
import { stringify } from "querystring";

const API_URL = import.meta.env.VITE_API_URL;

const useCreateCard = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);

  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (cardData: Card) => {
      const cardWithoutId = { ...cardData };
      delete cardWithoutId._id;

      return apiRequest<SingleCardApiResponse>(
        `${API_URL}/boards/${boardId}/cards`,
        {
          method: "POST",
          data: cardWithoutId,
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
