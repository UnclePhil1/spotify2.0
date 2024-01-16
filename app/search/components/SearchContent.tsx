"use client";
import React from "react";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikedButton from "@/components/LikedButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) {
    return (
      <div
        className="
      flex
      flex-col
      gap-y-2
      w-full
      px-6
      text-neutral-400
      "
      >
        No Songs Found.
      </div>
    );
  }

  return (
    <div
      className="
      flex
      flex-col
    gap-y-2
    w-full
    px-6
    "
    >
      {songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          {/* Add Like Button */}
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
