"use client";
import { Track as Song } from "@spotify/web-api-ts-sdk";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import LockArrayContext from "./LockArrayContext";
import { GENRE } from "@/constants/constants";

// Definiendo al contexto y sus valores

interface SongsContextType {
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
  handleKeyDown: (event: any) => void;
  getRandomSong: (cardPos: number) => void;
}

export const SongsContext = createContext<SongsContextType>({
  songs: [],
  setSongs: () => {},
  handleKeyDown: () => {},
  getRandomSong: async () => {},
});

// Definir el componente "Provider" del context

interface SongsContextProviderProps {
  children: ReactNode;
  getRandomSongs: (amount: number, genre: string) => Promise<Song[]>;
}

export const SongsContextProvider: FC<SongsContextProviderProps> = ({
  children,
  getRandomSongs,
}) => {
  // Current tracks in container
  const [songs, setSongs] = useState<Song[]>([]);
  const searchParams = useSearchParams();

  const { lockArray } = useContext(LockArrayContext);

  // Género actualizado solamente si cambian los parámetros de búsqueda
  const genre = useMemo(() => {
    return searchParams.get(GENRE)?.toString();
  }, [searchParams]);

  // Función de distribución
  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === " ") {
        getRandomSongs(lockArray.length, genre || "rock").then(
          (songsObtained) =>
            setSongs(
              songsObtained.map((song, index) =>
                lockArray[index] ? songs[index] : song
              )
            )
        );
      }
    },
    [genre, songs]
  );

  // Obtener una cacnión randómica
  const getRandomSong = useCallback(
    (cardPos: number) => {
      if (!lockArray[cardPos]) {
        getRandomSongs(1, genre || "rock").then((songList) => {
          setSongs((prevSongs) => {
            const newSongsList = [...prevSongs];
            newSongsList[cardPos] = songList[0];
            return newSongsList;
          });
        });
      }
    },
    [genre, lockArray]
  );

  useEffect(() => {
    if (songs.length === 0 && genre) {
      getRandomSongs(lockArray.length, genre).then((randomSongs) =>
        setSongs(randomSongs)
      );
    }
  }, [genre]);

  return (
    <SongsContext.Provider
      value={{
        songs: songs,
        setSongs: setSongs,
        handleKeyDown: handleKeyDown,
        getRandomSong: getRandomSong,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export default SongsContext;
