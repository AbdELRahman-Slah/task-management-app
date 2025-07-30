import { ListsContextType } from "@/types/list.types";
import { createContext } from "react";

export const ListsContext = createContext<ListsContextType | null>(null);
