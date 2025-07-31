import { useLayoutEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Lists from "@/components/board/Lists";
import { List } from "@/types/list.types";
import { ListsContext } from "@/contexts/ListsContext";

const Board = () => {
  const [boardHeight, setBoardHeight] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);
  const [lists, setLists] = useState<List[]>();

  useLayoutEffect(() => {
    const { height } = navbarRef.current.getBoundingClientRect();

    const boardHeight = window.innerHeight - height - 64 - 32;

    setBoardHeight(boardHeight);
  }, [setBoardHeight]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={true} navbarRef={navbarRef} />
      <div className={`mx-auto pt-8`} style={{ height: boardHeight }}>
        <div className="mb-8 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Board Title</h1>
            <p className="text-muted-foreground mt-1">
              Manage tasks and track progress
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["JD", "JS", "MJ", "SW"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-medium border-2 border-background"
                >
                  {initials}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>
        <ListsContext.Provider value={{ lists, setLists }}>
          <Lists />
        </ListsContext.Provider>
      </div>
    </div>
  );
};

export default Board;
