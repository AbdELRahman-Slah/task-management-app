import { Card } from "@/types/card.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./TaskCard";

const SortableCard = ({ listId, card }: { card: Card; listId: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { type: "card", listId, card } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {!isDragging && <TaskCard card={card} />}
      {isDragging && (
        <div className="border-border/50 h-20 bg-card rounded-sm" />
      )}
    </div>
  );
};

export default SortableCard;
