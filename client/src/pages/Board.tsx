import { useLayoutEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Lists from "@/components/board/Lists";
import BoardContextProvider from "@/contexts/BoardContextProvider";

const Board = () => {
  const [boardHeight, setBoardHeight] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const { height } = navbarRef.current.getBoundingClientRect();

    const boardHeight = window.innerHeight - height - 64 - 32;

    setBoardHeight(boardHeight);
  }, [setBoardHeight]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={true} navbarRef={navbarRef} />
      <div className={`mx-auto pt-8`} style={{ height: boardHeight }}>
        <BoardContextProvider>
          <Lists />
        </BoardContextProvider>
      </div>
    </div>
  );
};

export default Board;
