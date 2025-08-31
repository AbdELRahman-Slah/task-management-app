import { useState } from "react";
import CustomTextarea from "../CustomTextarea";
import useUpdateList from "@/hooks/lists/useUpdateList";
import { List } from "@/types/list.types";

const ListHeader = ({ list }: { list: List }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);

  const { updateList } = useUpdateList();

  const handleSaveChange = () => {
    updateList({ ...list, title });
    setIsEditingTitle(false);
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
