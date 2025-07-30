import { List } from "@/types/list.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { TaskList } from "./TaskList";

interface SortableProps {
  id: string;
  list: List;
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
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.4 : null,
  };

  return (
    <div ref={setNodeRef} style={style} className="pointer-events-auto">
      <TaskList
        list={props.list}
        setActivatorNodeRef={setActivatorNodeRef}
        attributes={attributes}
        listeners={listeners}
      />
    </div>
  );
};

export default SortableList;
