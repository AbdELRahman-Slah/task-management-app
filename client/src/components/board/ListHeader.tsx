import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleListApiResponse } from "@/types/list.types";
import CustomTextarea from "../CustomTextarea";
import { ListsContext } from "@/contexts/ListsContext";

const API_URL = import.meta.env.VITE_API_URL;

const ListHeader = ({ listTitle, listId }) => {
  const { boardId } = useParams();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(listTitle);
  const { lists, setLists } = useContext(ListsContext);

  const userToken = localStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: (title: string) =>
      axios.patch<SingleListApiResponse>(
        `${API_URL}/boards/${boardId}/lists/${listId}`,
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
  });

  const handleSaveChange = () => {
    mutation.mutate(title);

    setIsEditingTitle(false);

    const listsCopy = [...lists];
    const listToUpdateIndex = listsCopy.findIndex(({ _id }) => listId === _id);
    listsCopy[listToUpdateIndex].title = title;

    setLists(listsCopy);
  };

  return isEditingTitle ? (
    <CustomTextarea
      className="resize-none break-words min-h-min p-0 rounded-none"
      placeholder="List title"
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSaveChange();
        }
      }}
      onFocus={(e) => {
        e.target.select();
      }}
      onBlur={() => {
        handleSaveChange();
      }}
    />
  ) : (
    <button
      onClick={() => {
        setIsEditingTitle(true);
      }}
      className="break-all w-full text-left"
    >
      {title}
    </button>
  );
};

export default ListHeader;
