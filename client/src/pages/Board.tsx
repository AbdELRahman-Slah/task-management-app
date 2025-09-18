import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Navbar } from "@/components/global/Navbar";
import Lists from "@/components/board/Lists";
import BoardContextProvider from "@/providers/BoardContextProvider";
import { BoardContext } from "@/contexts/BoardContext";
import useGetSingleBoard from "@/hooks/boards/useGetSingleBoard";

const Board = () => {
  const [boardHeight, setBoardHeight] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);

  const [boardBackground, setBoardBackground] = useState<string>("");

  console.log(boardBackground);

  const { data, isPending } = useGetSingleBoard();

  useEffect(() => {
    if (data) {
      setBoardBackground(data[0].background);
      console.log(data[0].background);
    }
    console.log(data);
  }, [data]);

  useLayoutEffect(() => {
    const { height } = navbarRef.current.getBoundingClientRect();

    const boardHeight = window.innerHeight - height;

    setBoardHeight(boardHeight);
  }, [setBoardHeight]);

  return (
    <div className={`min-h-screen  ${boardBackground}`}>
      <Navbar isLoggedIn={true} navbarRef={navbarRef} />
      {isPending || (
        <div className={`mx-auto pt-8`} style={{ height: boardHeight }}>
          <BoardContextProvider>
            <Lists />
          </BoardContextProvider>
        </div>
      )}
    </div>
  );
};

export default Board;
