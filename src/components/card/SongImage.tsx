import React from "react";

interface SongImageProps {
  linkImage: string;
}

const SongImage = (props: SongImageProps) => {
  return (
    <img
      src={props.linkImage}
      className="h-[40%] w-fit rounded-full border-[#000004] border-4"
    />
  );
};

export default SongImage;
