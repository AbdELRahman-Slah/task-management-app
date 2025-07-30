import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import CustomTextarea from "../CustomTextarea";

const API_URL = import.meta.env.VITE_API_URL;
const userToken = localStorage.getItem("token");

export default function AddNewList() {
  const { boardId } = useParams();
  const [isAddingList, setIsAddingList] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const mutation = useMutation({
    mutationFn: (listTitle: string) =>
      axios.post(
        `${API_URL}/boards/${boardId}/lists`,
        { title: listTitle, position: 0 },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),

    onSuccess: () => {
      setIsAddingList(false);
      setListTitle("");
      toast({
        title: "List was added successfully",
        variant: "destructive",
      });
    },
  });

  const onSaveChange = () => {
    if (listTitle.trim()) {
      mutation.mutate(listTitle.trim());

      setListTitle("");
    }

    setIsAddingList(false);
  };

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
                  onSaveChange();
                }
              }}
              className="mb-4 min-h-min resize-none"
            />
            <div className="flex flex-row gap-3 justify-start">
              <Button
                onClick={() => {
                  onSaveChange();
                }}
              >
                Add List
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsAddingList(false);
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
