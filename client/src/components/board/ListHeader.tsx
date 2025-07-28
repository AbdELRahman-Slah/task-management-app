import { useEffect, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { title } from "process";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleListApiResponse } from "@/types/list.types";

const API_URL = import.meta.env.VITE_API_URL;

const ListHeader = ({ listTitle, listId }) => {
  const { boardId } = useParams();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(listTitle);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  }, [title, isEditingTitle]);

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

  const onSaveChange = () => {
    setIsEditingTitle(false);

    mutation.mutate(title);
  };

  return isEditingTitle ? (
    <Textarea
      className="resize-none break-words min-h-min p-0 rounded-none"
      placeholder="List title"
      autoFocus
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSaveChange();
        }
      }}
      onFocus={(e) => {
        e.target.select();
      }}
      onBlur={() => {
        onSaveChange();
      }}
      ref={textareaRef}
      rows={1}
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
