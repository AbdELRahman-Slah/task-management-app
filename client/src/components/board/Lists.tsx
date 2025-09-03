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
import { TaskList } from "./TaskList";
import useGetLists from "@/hooks/lists/useGetLists";
import SortableList from "./SortableList";
import { TaskCard } from "./TaskCard";
import { createPortal } from "react-dom";
import useGetCards from "@/hooks/cards/useGetCards";
import useDragHandlers from "@/hooks/useDragHandlers";

const Lists = () => {
  const {
    activeList,
    activeCard,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useDragHandlers();

  const { isSuccess: isListsSuccess, lists } = useGetLists();
  const { isSuccess: isCardsSuccess, cards } = useGetCards();

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

  const listIds = lists?.map(({ _id }) => _id);

  return isListsSuccess ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={listIds} strategy={horizontalListSortingStrategy}>
        <ScrollContainer
          className="flex gap-6 px-6 overflow-x-auto select-none flex-grow pb-16 h-full scroll-container"
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
            const listCards = cards.filter((card) => card.listId === list._id);

            return (
              <SortableList
                cards={listCards}
                id={list._id}
                list={list}
                key={list._id}
              />
            );
          })}

          <AddNewList listsLength={lists.length} />
        </ScrollContainer>
      </SortableContext>

      {createPortal(
        <DragOverlay>
          {activeList && (
            <TaskList
              cards={cards.filter((card) => card.listId === activeList._id)}
              list={activeList}
            />
          )}
          {activeCard && <TaskCard card={activeCard} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  ) : null;
};

export default Lists;
