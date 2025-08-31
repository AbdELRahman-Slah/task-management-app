import { ListsApiResponse } from "@/types/list.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";

const API_URL = import.meta.env.VITE_API_URL;

const useGetLists = () => {
  const { boardId } = useParams();
  const { lists, setLists } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const listsQuery = useQuery({
    queryKey: ["lists", boardId],
    queryFn: () =>
      axios.get<ListsApiResponse>(`${API_URL}/boards/${boardId}/lists`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (listsQuery.isSuccess && lists.length === 0) {
      setLists(listsQuery.data.lists);
    }
  }, [listsQuery, lists, setLists]);

  return { lists, ...listsQuery };
};

export default useGetLists;
