import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { MoreHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ListDropdownMenu = ({ listId }: { listId: string }) => {
  const { boardId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userToken = localStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: () =>
      axios.delete(`${API_URL}/boards/${boardId}/lists/${listId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
  });

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 p-0 !mt-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-52 p-2 space-y-1">
        <DropdownMenuLabel>
          <div className="flex flex-row justify-between items-center">
            <div>List actions</div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={21} />
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2">Add card</DropdownMenuItem>
        <DropdownMenuItem className="p-2">Copy list</DropdownMenuItem>
        <DropdownMenuItem className="p-2">Move list</DropdownMenuItem>
        <DropdownMenuItem
          className="p-2 data-[highlighted]:bg-red-500 data-[highlighted]:text-white"
          onClick={() => mutation.mutate()}
        >
          Delete list
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListDropdownMenu;
