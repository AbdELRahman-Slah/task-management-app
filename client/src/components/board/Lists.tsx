import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import ScrollContainer from "react-indiana-drag-scroll";
import AddNewList from "./AddNewList";
import { TaskList } from "./TaskList";
import useGetLists from "@/hooks/useGetLists";
import { useContext, useState } from "react";
import SortableList from "./SortableList";
import { List, ListToUpdate } from "@/types/list.types";
import useUpdateLists from "@/hooks/useUpdateLists";
import { ListsContext } from "@/contexts/ListsContext";

const Lists = () => {
  const [activeList, setActiveList] = useState<List>();
  const { isSuccess, isPending, isError, error } = useGetLists();

  const { lists, onChangeLists } = useContext(ListsContext);

  const { setListsToUpdate } = useUpdateLists();

  const updateLists = (lists: List[]) => {
    const listsWithNewPositions: ListToUpdate[] = lists.map((list, idx) => ({
      _id: list._id,
      position: idx,
    }));

    setListsToUpdate(listsWithNewPositions);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const listIds = lists?.map(({ _id }) => _id);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveList(lists.find(({ _id }) => active.id === _id));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over.id) {
      const oldIndex = lists.findIndex(({ _id }) => _id === active.id);
      const newIndex = lists.findIndex(({ _id }) => _id === over.id);

      const updatedLists = arrayMove(lists, oldIndex, newIndex);

      updateLists(updatedLists);

      onChangeLists(updatedLists);
    }
  };

  return isSuccess ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={listIds} strategy={horizontalListSortingStrategy}>
        <ScrollContainer
          className="flex gap-6 px-6 overflow-x-auto select-none flex-grow pb-16 h-full"
          horizontal
          vertical={false}
          hideScrollbars={false}
          ignoreElements="div"
        >
          {lists.map((list) => (
            <div className="pointer-events-none" key={list._id}>
              <SortableList id={list._id} list={list} />
            </div>
          ))}

          <AddNewList />
        </ScrollContainer>
      </SortableContext>

      <DragOverlay>{activeList && <TaskList list={activeList} />}</DragOverlay>
    </DndContext>
  ) : null;
};

export default Lists;
