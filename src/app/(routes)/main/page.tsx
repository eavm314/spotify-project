import { CountList } from "./components/CountList";
import { SongList } from "./components/SongList";

const MainPage = async () => {
  return (
    <div className="flex w-full overflow-auto gap-5 p-5">
      <SongList/>
      <CountList title="Genres List" objectKey="genre"/>
      <CountList title="Artists List" objectKey="artist"/>
      <CountList title="Year List" objectKey="year"/>
    </div>
  )
}

export default MainPage;