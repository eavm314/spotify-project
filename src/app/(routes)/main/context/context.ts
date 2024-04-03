import { CountType } from '@/types/general'
import { create } from 'zustand'

interface SongState {
  genresCount: Record<string, number>,
  artistsCount: Record<string, number>,
  yearCount: Record<string, number>,
  updateCount: (type: CountType, value: string) => void
}

export const useGenresStore = create<SongState>((set) => ({
  genresCount: {},
  artistsCount: {},
  yearCount: {},
  updateCount: (type, value) => set((state) => {
    switch (type) {
      case "genre":
        return {
          genresCount: {
            ...state.genresCount,
            [value]: (state.genresCount[value] ?? 0) + 1
          }
        };
      case "artist":
        return {
          artistsCount: {
            ...state.artistsCount,
            [value]: (state.artistsCount[value] ?? 0) + 1
          }
        };
      case "year":
        return {
          yearCount: {
            ...state.yearCount,
            [value]: (state.yearCount[value] ?? 0) + 1
          }
        };
    }
  }),
}))