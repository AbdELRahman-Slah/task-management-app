import { ListsContext } from "@/contexts/ListsContext";
import { List, ListsApiResponse } from "@/types/list.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useGetLists = () => {
  const { boardId } = useParams();
  const { lists, setLists } = useContext(ListsContext);

  const userToken = localStorage.getItem("token");

  const { isPending, isSuccess, isError, data, error } = useQuery({
    queryKey: ["lists"],
    queryFn: () =>
      axios.get<ListsApiResponse>(`${API_URL}/boards/${boardId}/lists`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (isSuccess) {
      setLists(data.lists);
    }
  }, [isSuccess, data, setLists]);

  return { isSuccess: !!lists, isPending, isError, error };
};

export default useGetLists;
