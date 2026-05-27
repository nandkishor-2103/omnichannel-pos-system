import { createContext } from "react";

export interface SidebarContextType {
  sidebarOpen: boolean;

  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
