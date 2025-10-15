import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import CustomTextarea from "../global/CustomTextarea";
import { v4 as uuidv4 } from "uuid";
import { List } from "@/types/list.types";

export default function AddNewList({
  listsLength,
  createList,
}: {
  listsLength: number;
  createList: (list: List) => void;
}) {
  const [listTitle, setListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);

  const handleSaveChange = () => {
    if (listTitle.trim()) {
      createList({
        _id: uuidv4(), // Temporary ID
        title: listTitle,
        position: listsLength,
      });
    }
    setListTitle("");
    setIsAddingList(false);
  };

  return (
    <Card className="min-w-[300px] bg-list shadow-sm backdrop-blur-sm border-border/50 border-dashed h-fit task-card">
      <CardContent className="p-4 h-fit">
        {isAddingList ? (
          <>
            <CustomTextarea
              placeholder="Enter List Title"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSaveChange();
                }
              }}
              onBlur={() => {
                setIsAddingList(false);
                setListTitle("");
              }}
              className="mb-4 min-h-min resize-none"
            />
            <div className="flex flex-row gap-3 justify-start">
              <Button
                onMouseDown={() => {
                  handleSaveChange();
                }}
              >
                Add List
              </Button>
              <Button
                type="button"
                variant="ghost"
                onMouseDown={() => {
                  setIsAddingList(false);
                  setListTitle("");
                }}
              >
                <X size={20} strokeWidth={3} />
              </Button>
            </div>
          </>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => {
              setIsAddingList(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add another list
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
