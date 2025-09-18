import { Users, Calendar, Plus, MoreVertical } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import CreateBoardModal from "./CreateBoardModal";
import { useContext, useState } from "react";
import { Board } from "@/types/board.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useDeleteBoard from "@/hooks/boards/useDeleteBoard";
import { BoardContext } from "@/contexts/BoardContext";

const BoardList = ({ boards }: { boards: Board[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mutation = useDeleteBoard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {!!boards.length &&
        boards.map((board) => (
          <Link key={board._id} to={`/board/${board._id}`}>
            <Card className="group hover:ring-1 hover:ring-ring/40 transition-all duration-100 overflow-hidden bg-list backdrop-blur-sm border-border/50">
              <div className={`h-32 ${board.background} relative`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {board.title}
                    </h3>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:ring-1 ring-inset hover:bg-list rounded-full p-2">
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link to={`/board/${board._id}/settings`}>
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500 hover:!bg-red-600 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            mutation.mutate(board._id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{board.users.length} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(board.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

      {/* Create New Board Card */}
      <Card
        className="group hover:ring-1 hover:ring-ring/40 transition-all duration-100 bg-list backdrop-blur-sm border-border/50 border-dashed"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            Create New Board
          </h3>
          <p className="text-sm text-muted-foreground">
            Start a new project and organize your tasks
          </p>
        </CardContent>
      </Card>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BoardList;
