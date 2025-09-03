import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Plus } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BoardListSkeleton from "@/components/dashboard/BoardListSkeleton";
import BoardList from "@/components/dashboard/BoardList";
import { BoardsApiResponse } from "@/types/board.types";
import CreateBoardModal from "@/components/dashboard/CreateBoardModal";
import { useState } from "react";
import useApiRequest from "@/hooks/useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiRequest = useApiRequest();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["boards"],
    queryFn: () =>
      apiRequest<BoardsApiResponse>(`${API_URL}/boards`, {
        method: "get",
      }),
    select: (data) => data.data.data,
  });

  const queryClient = useQueryClient();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={true} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Your Boards
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your projects and collaborate with your team
              </p>
            </div>

            <Button
              className="bg-gradient-primary shadow-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Board
            </Button>
          </div>
        </div>

        {isPending ? <BoardListSkeleton /> : <BoardList boards={data.boards} />}

        <CreateBoardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBoardCreated={() => {
            setIsModalOpen(false);

            queryClient.invalidateQueries({ queryKey: ["boards"] });
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
