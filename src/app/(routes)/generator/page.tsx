import { SongsContainer } from "@/app/(routes)/generator/components/SongsContainer";
import { GenresComboBox } from "@/app/(routes)/generator/components/input/GenresComboBox";
import { Text, TitleText } from "@/components/text/text";
import { LockArrayContextProvider } from "@/app/(routes)/generator/context/LockArrayContext";
import { SongsContextProvider } from "@/app/(routes)/generator/context/SongsContext";
import { getGenres, getRandomSongs } from "@/spotifyServices/getRandomSongs";

const GeneratorPage = () => {
  return (
    <div className="inset-0 absolute">
      <LockArrayContextProvider>
        <SongsContextProvider getRandomSongs={getRandomSongs}>
          <div className="flex flex-col h-[30%] w-full items-center justify-evenly">
            <TitleText>Spotify Randomizer</TitleText>
            <Text>
              Press SPACE in order to shuffle 5 different songs to your new
              Playlist
            </Text>
            <div className="flex h-[10%] w-full justify-evenly">
              <GenresComboBox initialText="Random Genre" getGenres={getGenres} />
              {/* <ComboBox text="Random Artist" /> */}
            </div>
          </div>
          <SongsContainer />
        </SongsContextProvider>
      </LockArrayContextProvider>
    </div>
  );
};

export default GeneratorPage;
