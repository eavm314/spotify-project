import { CountType } from '@/types/general'
import { create } from 'zustand'

interface SongState {
  genresCount: Record<string, string[]>,
  artistsCount: Record<string, string[]>,
  yearCount: Record<string, string[]>,
  updateCount: (type: CountType, value: string, uri: string) => void
}

export const useGenresStore = create<SongState>((set) => ({
  genresCount: {},
  artistsCount: {},
  yearCount: {},
  updateCount: (type, value, uri) => set((state) => {
    switch (type) {
      case "genre":
        return {
          genresCount: {
            ...state.genresCount,
            [value]: [...(state.genresCount[value] ?? []), uri]
          }
        };
      case "artist":
        return {
          artistsCount: {
            ...state.artistsCount,
            [value]: [...(state.artistsCount[value] ?? []), uri]

          }
        };
      case "year":
        return {
          yearCount: {
            ...state.yearCount,
            [value]: [...(state.yearCount[value] ?? []), uri]

          }
        };
    }
  }),
}))