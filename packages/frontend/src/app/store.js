import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BOT_RESPONSE, USER_RESPONSE } from "./constants";

export const usePhapDienStore = create(
  persist(
    (set) => ({
      phapDien: {},
      layDuLieu: async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/phapdien/data`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        const phapDien = await res.json();
        set({ phapDien });
      },
    }),
    {
      name: "phapdien", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      error: false,
      setError: (error) => set({ error }),
      login: async (username, password) => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
              }),
            }
          );
          const user = await res.json();
          set({ user });
        } catch (error) {
          set({ error: true });
        }
      },
      logout: () => {
        // const res = await fetch(endpoint);
        // const user = await res.json();
        set({ user: {} });
      },
    }),
    {
      name: "user", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
export const useChatbotStore = create(
  persist(
    (set, state) => ({
      history: [],
      setHistory: (history) => {
        set({ history });
      },
    }),
    {
      name: "chatbot", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useSearchStore = create((set) => ({
  searchResult: null,
  setSearchResult: (searchResult) => {
    set({ searchResult });
  },
}));
