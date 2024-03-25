"use client"
import { Button } from '@/components/input/Button'
import { createRandomPlaylist } from '@/spotifyServices/createPlaylist'

export const CreatePlaylistButton = ({uris}: {uris: string[]}) => {
  const create = async () => {
    const playlist = await createRandomPlaylist(uris)
    console.log(playlist)
  }
  return (
    <Button action={create}>
    Create Playlist
  </Button>
  )
}
