import { Data } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiRequest from "../useApiRequest";
import { Board, BoardsApiResponse } from "@/types/board.types";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useCreateBoard = () => {
  const apiRequest = useApiRequest();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Data) =>
      apiRequest<BoardsApiResponse>(`${API_URL}/boards`, {
        method: "POST",
        data,
      }),

    onSuccess: () => {
      toast({
        title: "Board created successfully",
        variant: "default",
      });

      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: () => {
      toast({
        title: "Error creating board",
        variant: "destructive",
      });
    },
  });
};

export default useCreateBoard;
