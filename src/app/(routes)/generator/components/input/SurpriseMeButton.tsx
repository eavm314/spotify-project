"use client";
import React, { useContext } from "react";
import { Button } from "../../../../../components/input/Button";
import SongsContext from "@/app/(routes)/generator/context/SongsContext";
import LockArrayContext from "@/app/(routes)/generator/context/LockArrayContext";

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
