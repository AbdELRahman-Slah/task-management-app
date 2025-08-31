import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useContext, useState } from "react";
import CustomTextarea from "../CustomTextarea";
import useCreateList from "@/hooks/lists/useCreateList";
import { v4 as uuidv4 } from "uuid";
import Lists from "./Lists";
// import Lists from "./Lists";

export default function AddNewList({ listsLength }: { listsLength: number }) {
  const [listTitle, setListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);
  const { createList } = useCreateList();

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

  // TODO: add loading indicator to return real id

  return (
    <Card className="min-w-[300px] bg-gradient-card backdrop-blur-sm border-border/50 border-dashed h-fit">
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
              className="mb-4 min-h-min resize-none"
            />
            <div className="flex flex-row gap-3 justify-start">
              <Button
                onClick={() => {
                  handleSaveChange();
                }}
              >
                Add List
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
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
