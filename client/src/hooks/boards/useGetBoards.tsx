import { BoardsApiResponse } from "@/types/board.types";
import { useQuery } from "@tanstack/react-query";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useGetBoards = () => {
  const apiRequest = useApiRequest();

  return useQuery({
    queryKey: ["boards"],
    queryFn: async() => {
      const res = await apiRequest<BoardsApiResponse>(`${API_URL}/boards`, {
        method: "get",
      });
      return res.data.data.boards
    },
  });
};

export default useGetBoards;
