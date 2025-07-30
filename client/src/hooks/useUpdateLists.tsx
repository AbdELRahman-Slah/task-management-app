import { ListToUpdate } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateLists = () => {
  const { boardId } = useParams();
  const [listsToUpdate, setListsToUpdate] = useState<ListToUpdate[]>();

  const userToken = localStorage.getItem("token");

  const { isSuccess, mutate, isError, error } = useMutation({
    mutationFn: (listToUpdate: ListToUpdate[]) =>
      axios.patch(
        `${API_URL}/boards/${boardId}/lists`,
        { lists: listsToUpdate },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
  });

  useEffect(() => {
    if (listsToUpdate) {
      mutate(listsToUpdate);
    }
  }, [listsToUpdate, mutate]);

  return { setListsToUpdate };
};

export default useUpdateLists;
