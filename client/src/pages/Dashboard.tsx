import { Navbar } from "@/components/global/Navbar";
import BoardListSkeleton from "@/components/dashboard/BoardListSkeleton";
import BoardList from "@/components/dashboard/BoardList";
import useGetBoards from "@/hooks/boards/useGetBoards";

const Dashboard = () => {
  const { isPending, isError, data, error } = useGetBoards();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={true} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isPending ? <BoardListSkeleton /> : <BoardList boards={data} />}
      </div>
    </div>
  );
};

export default Dashboard;
