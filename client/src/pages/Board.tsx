import { useEffect, useState } from "react";
import Lists from "@/components/board/Lists";
import BoardContextProvider from "@/providers/BoardContextProvider";
import useGetSingleBoard from "@/hooks/boards/useGetSingleBoard";
import BoardNavbar from "@/components/board/BoardNavbar";
import Loader from "@/components/global/Loader";

const Board = () => {
  const [boardBackground, setBoardBackground] = useState<string>("");

  const { data, isLoading } = useGetSingleBoard();

  useEffect(() => {
    if (data) {
      setBoardBackground(data[0].background);
    }
  }, [data]);

  console.log(isLoading);

  return (
    <div className={`h-screen  ${boardBackground}`}>
      <BoardNavbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`mx-auto pt-8 h-[90%]`}>
          <BoardContextProvider>
            <Lists />
          </BoardContextProvider>
        </div>
      )}
    </div>
  );
};

export default Board;
