import { SongsContainer } from "@/components/cards/SongsContainer";
import { ComboBox } from "@/components/input/ComboBox";
import { Text } from "@/components/text/Text";
import { TitleText } from "@/components/text/TitleText";

const GeneratorPage = () => {
  return (
    <div className="">
      <TitleText>Spotify Randomizer</TitleText>
      <Text>
        Press SPACE in order to shuffle 5 different songs to your new Playlist
      </Text>
      <div className="w-64">
        <ComboBox text="Genre" />
      </div>
      <div className="w-64">
        <ComboBox text="Artist" />
      </div>
      <SongsContainer/>
    </div>
  );
};

export default GeneratorPage;
