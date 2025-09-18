import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiRequest from "../useApiRequest";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  const apiRequest = useApiRequest();

  return useMutation({
    mutationFn: (boardId: string) => {
      return apiRequest(`${API_URL}/boards/${boardId}`, {
        method: "DELETE",
      });
    },

    onSuccess: () => {
      toast({
        title: "Board deleted successfully",
        variant: "default",
      });

      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },

    onError: () => {
      toast({
        title: "Error deleting board",
        variant: "destructive",
      });
    },
  });
};

export default useDeleteBoard;
