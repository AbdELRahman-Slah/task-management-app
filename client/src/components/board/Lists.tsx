import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import ScrollContainer from "react-indiana-drag-scroll";
import AddNewList from "./AddNewList";
import useGetLists from "@/hooks/lists/useGetLists";
import SortableList from "./SortableList";
import { createPortal } from "react-dom";
import useDragHandlers from "@/hooks/useDragHandlers";
import TaskListOverlay from "./TaskListOverlay";
import TaskCardOverlay from "./TaskCardOverlay";
import { Skeleton } from "../ui/skeleton";
import useCreateList from "@/hooks/lists/useCreateList";

const Lists = () => {
  const {
    activeList,
    activeCard,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useDragHandlers();

  const {
    isSuccess: isListsSuccess,
    lists,
    isLoading: isListsLoading,
  } = useGetLists();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 2,
      },
    })
  );
  const { createList, context: tempList } = useCreateList();

  const listIds = lists?.map(({ _id }) => _id);

  return (
    <>
      {isListsSuccess && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={listIds}
            strategy={horizontalListSortingStrategy}
          >
            <ScrollContainer
              className="flex gap-6 px-6 overflow-x-auto select-none flex-grow h-full pb-24 scroll-container"
              horizontal
              vertical={false}
              hideScrollbars={false}
              onClick={() => {
                const active = document.activeElement;
                if (active instanceof HTMLElement) {
                  active.blur();
                }
              }}
              ignoreElements=".draggable-item"
            >
              {lists.map((list) => {
                return (
                  <SortableList
                    id={list._id}
                    list={list}
                    key={list._id}
                    isTempList={tempList?._id === list._id}
                  />
                );
              })}

              <AddNewList listsLength={lists.length} createList={createList} />
            </ScrollContainer>
          </SortableContext>

          {createPortal(
            <DragOverlay>
              {activeList && <TaskListOverlay list={activeList} />}
              {activeCard && <TaskCardOverlay card={activeCard} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      )}
      {isListsLoading && (
        <div className="flex gap-6 px-6 overflow-x-auto select-none flex-grow pb-16 h-full">
          <Skeleton className="min-w-80 sm:min-w-96 h-80 rounded-md" />
          <Skeleton className="min-w-80 sm:min-w-96 h-96 rounded-md" />
          <Skeleton className="min-w-80 sm:min-w-96 h-72 rounded-md" />
        </div>
      )}
    </>
  );
};

export default Lists;
