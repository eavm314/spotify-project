import { SongsContainer } from "@/components/containers/SongsContainer";
import { ComboBox } from "@/components/input/ComboBox";
import { Text } from "@/components/text/Text";
import { TitleText } from "@/components/text/TitleText";
import { LockArrayContextProvider } from "@/context/LockArrayContext";
import { getGenres } from "@/spotifyServices/getRandomSongs";

const GeneratorPage = () => {

  const initialLockArray = [false, false, false, false, false];

  return (
    <div className="inset-0 absolute">
      <div className="flex flex-col h-[30%] w-full items-center justify-evenly">
        <TitleText>Spotify Randomizer</TitleText>
        <Text>
          Press SPACE in order to shuffle 5 different songs to your new Playlist
        </Text>
        <div className="flex h-[10%] w-full justify-evenly">
          <ComboBox initialText="Random Genre" getData={getGenres} />
          {/* <ComboBox text="Random Artist" /> */}
        </div>
      </div>
      <LockArrayContextProvider initial={initialLockArray}>
        <SongsContainer />
      </LockArrayContextProvider>
    </div>
  );
};

export default GeneratorPage;
