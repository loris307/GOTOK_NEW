import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: 'light',
  favorites: [],
  language: 'en',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  addToFavorites: (quote) =>
    set((state) => ({
      favorites: [...state.favorites, { quote, liked: true }],
    })),
  removeFromFavorites: (quote) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.quote !== quote),
    })),
  toggleLike: (quote) =>
    set((state) => ({
      favorites: state.favorites.map((item) =>
        item.quote === quote ? { ...item, liked: !item.liked } : item
      ),
    })),
  setLanguage: (language) => set({ language }), 
}));

export default useThemeStore;