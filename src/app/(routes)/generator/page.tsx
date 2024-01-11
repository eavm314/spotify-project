import { SongsContainer } from "@/components/card/SongsContainer";
import { ComboBox } from "@/components/input/ComboBox";
import { Text } from "@/components/text/Text";
import { TitleText } from "@/components/text/TitleText";

const GeneratorPage = () => {
  return (
    <div className="inset-0 absolute">
      <div className="flex flex-col h-[30%] w-full items-center justify-evenly">
        <TitleText>Spotify Randomizer</TitleText>
        <Text>
          Press SPACE in order to shuffle 5 different songs to your new Playlist
        </Text>
        <div className="flex w-full justify-evenly">
          <div className="w-64">
            <ComboBox text="Genre" />
          </div>
          <div className="w-64">
            <ComboBox text="Artist" />
          </div>
        </div>
      </div>
      <SongsContainer />
    </div>
  );
};

export default GeneratorPage;
