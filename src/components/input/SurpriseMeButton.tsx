import React, { useContext } from "react";
import { Button } from "./Button";
import SongsContext from "@/context/SongsContext";
import LockArrayContext from "@/context/LockArrayContext";

const SurpriseMeButton = () => {
  const { setLockArray } = useContext(LockArrayContext);
  const { setRandomSongs } = useContext(SongsContext);

  const surprise = () => {
    setLockArray((prevLockArray) => {
      return prevLockArray.map((lock) => (lock ? false : lock));
    });
    setRandomSongs();
  };

  return <Button action={surprise}>Surprise me!</Button>;
};

export default SurpriseMeButton;
