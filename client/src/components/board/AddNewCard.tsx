import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomTextarea from "../global/CustomTextarea";
import { useParams } from "react-router-dom";
import useCreateCard from "@/hooks/cards/useCreateCard";
import { Card } from "@/types/card.types";
import { v4 as uuidv4, v4 } from "uuid";

const AddNewCard = ({ listId, cards }: { listId: string; cards: Card[] }) => {
  const { boardId } = useParams();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const { createCard } = useCreateCard();

  const handleSaveChange = () => {
    const trimmedCardTitle = cardTitle.trim();

    if (trimmedCardTitle) {
      const cardsLength = cards.length;

      createCard({
        _id: uuidv4(), // Temporary ID
        title: trimmedCardTitle,
        position: cardsLength,
        listId,
        boardId,
      });
    }

    setCardTitle("");
    setIsAddingCard(false);
  };

  // TODO: add loading indicator to return real id

  return isAddingCard ? (
    <div className="w-full">
      <CustomTextarea
        placeholder="Enter List Title"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSaveChange();
          }
        }}
        onBlur={() => {
          setIsAddingCard(false);
          setCardTitle("");
        }}
        className="mb-4 min-h-min resize-none"
      />
      <div className="flex flex-row gap-3 justify-start">
        <Button
          onMouseDown={(e) => {
            handleSaveChange();
          }}
        >
          Add List
        </Button>
        <Button
          type="button"
          variant="ghost"
          onMouseDown={(e) => {
            setIsAddingCard(false);
            setCardTitle("");
          }}
        >
          <X size={20} strokeWidth={3} />
        </Button>
      </div>
    </div>
  ) : (
    <Button
      variant="ghost"
      className="w-full justify-start text-muted-foreground hover:text-foreground"
      onClick={() => {
        setIsAddingCard(true);
      }}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add a card
    </Button>
  );
};

export default AddNewCard;
