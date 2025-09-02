import { Card, CardContent } from "@/components/ui/card";
import { Card as CardType } from "@/types/card.types";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import useUpdateCard from "@/hooks/cards/useUpdateCard";
import { Trash2Icon } from "lucide-react";
import useDeleteCard from "@/hooks/cards/useDeleteCard";

export const TaskCard = ({ card }: { card: CardType }) => {
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>(card.title);

  const { updateCard } = useUpdateCard();
  const { deleteCard } = useDeleteCard();

  const handleSaveChange = () => {
    updateCard({
      ...card,
      title: cardTitle,
    });
    setTitleEdit(false);
  };

  const handleDeleteCard = () => {
    deleteCard(card._id);
  };

  return titleEdit ? (
    <Textarea
      value={cardTitle}
      className="bg-card hover:shadow-soft ring-1 ring-border/50 h-20 rounded-sm p-4 focus:ring-inset focus:ring-primary resize-none "
      autoFocus
      onBlur={handleSaveChange}
      onFocus={(e) => {
        e.target.select();
      }}
      onChange={(e) => setCardTitle(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSaveChange();
        }
      }}
    />
  ) : (
    <Card
      className="active:cursor-grabbing bg-card hover:shadow-soft border-border/50 h-20 rounded-sm md:touch-none"
      onClick={() => setTitleEdit(!titleEdit)}
    >
      <CardContent className="p-4 h-full">
        <div className="flex items-start justify-between gap-2 h-full">
          <h4 className="font-medium text-sm text-foreground leading-snug">
            {card.title}
          </h4>
          <button
            className="self-center bg-gradient-card hover:bg-red-950 p-2 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCard();
            }}
          >
            <Trash2Icon size={20} className="stroke-gray-300" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
