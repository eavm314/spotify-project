import { Button } from "@/components/input/Button";
import { Text } from "@/components/text/Text";
import { getRandomSongs } from "@/spotifyServices/getRandomSongs";
import { getUser } from "@/spotifyServices/userInfo";
import Link from "next/link";

const PruebasPage = async () => {

  // console.log(process.env.SPOTIFY_CLIENT_ID)
  const tracks = await getRandomSongs(5, "rock");
  console.log(tracks)
  const user = await getUser();
  console.log(user)

  return (
    <div className="">
      {tracks.map((rec, index) =>
        <Text key={index}>{rec.name}</Text>
      )}
      <Link href={"/auth/login"}>
        <Button>
          Login
        </Button>
      </Link>
      <Link href={"/auth/logout"}>
        <Button>
          Logout
        </Button>
      </Link>
      {user ?
        <div>
          Usuario: {user.display_name}
        </div> :
        <p>No hay user</p>
        }
    </div>
  )
}

export default PruebasPage