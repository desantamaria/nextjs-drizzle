import { create } from "zustand";

interface AppStore {
  userMessage: string;
  setUserMessage: (message: string) => void;
}

export const useAppStore = create<AppStore>(set => ({
  userMessage: "",
  setUserMessage: (message: string) => set({ userMessage: message }),
}));
