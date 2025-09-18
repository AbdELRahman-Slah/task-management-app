import { memo, useState } from "react";
import CustomTextarea from "../global/CustomTextarea";
import useUpdateList from "@/hooks/lists/useUpdateList";
import { List } from "@/types/list.types";

const ListHeader = memo(({ list }: { list: List }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);

  const { updateList } = useUpdateList();

  const handleSaveChange = () => {
    updateList({ ...list, title });
    setIsEditingTitle(false);
    setTitle(null);
  };

  return isEditingTitle ? (
    <CustomTextarea
      className="resize-none break-words min-h-min p-0 rounded-none"
      placeholder="List title"
      value={title || list.title}
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
      {title || list.title}
    </button>
  );
});

export default ListHeader;
