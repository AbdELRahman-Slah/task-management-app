import { useQuery } from "@tanstack/react-query";
import useApiRequest from "../useApiRequest";
import { useParams } from "react-router-dom";
import { BoardApiResponse } from "@/types/board.types";

const API_URL = import.meta.env.VITE_API_URL;

const useGetSingleBoard = () => {
  const { boardId } = useParams();

  const apiRequest = useApiRequest();

  return useQuery({
    queryKey: ["board"],
    queryFn: async () => {
      const res = await apiRequest<BoardApiResponse>(
        `${API_URL}/boards/${boardId}`,
        {
          method: "GET",
        }
      );

      return res.data.data.board;
    },
  });
};

export default useGetSingleBoard;
