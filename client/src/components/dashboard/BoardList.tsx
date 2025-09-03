import { Users, Calendar, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import CreateBoardModal from "./CreateBoardModal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const BoardList = ({ boards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {!!boards.length &&
        boards.map((board) => (
          <Link key={board._id} to={`/board/${board._id}`}>
            <Card className="group hover:shadow-card transition-all duration-300 overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50">
              <div className={`h-32 ${board.background} relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {board.title}
                  </h3>

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
        className="group hover:shadow-card transition-all duration-300 bg-gradient-card backdrop-blur-sm border-border/50 border-dashed"
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
        onBoardCreated={() => {
          setIsModalOpen(false);

          queryClient.invalidateQueries({ queryKey: ["boards"] });
        }}
      />
    </div>
  );
};

export default BoardList;
