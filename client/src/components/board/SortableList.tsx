import { List } from "@/types/list.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskList } from "./TaskList";
import { Card } from "@/types/card.types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface SortableProps {
  id: string;
  list: List;
  cards: Card[];
}

const SortableList = (props: SortableProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    data: {
      type: "list",
      list: props.list,
    },
  });

  const [listHeight, setListHeight] = useState<number>(0);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.4 : null,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`pointer-events-auto h-full touch-none`}
    >
      {!isDragging && (
        <TaskList
          cards={props.cards}
          list={props.list}
          setActivatorNodeRef={setActivatorNodeRef}
          attributes={attributes}
          listeners={listeners}
          setListHeight={setListHeight}
        />
      )}

      {isDragging && (
        <div className="h-full">
          <div
            style={{ height: listHeight }}
            className={`min-w-96 bg-gradient-card backdrop-blur-sm border-border/50 rounded-md`}
          />
        </div>
      )}
    </div>
  );
};

export default SortableList;
