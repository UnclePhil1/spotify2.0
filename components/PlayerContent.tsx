"use client";

import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  //   Play Next Music Function
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextsong = player.ids[currentIndex + 1];

    // If nextsong is last song, reset & play from begining
    if (!nextsong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextsong);
  };

  //   Play Prev Music Function
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    // If prevSong is first song, reset & play from begining
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onended: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <div className="hidden md:block">
          <LikedButton songId={song.id} />
          </div>
        </div>
      </div>
      {/* Mobile view */}
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div className="flex h-full justify-center items-center w-full max-w-[725px] gap-x-6">
          <AiFillStepBackward
            size={20}
            onClick={onPlayPrevious}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={20} className="text-black" />
          </div>
          <AiFillStepForward
            size={20}
            onClick={onPlayNext}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>
      {/* Desktop View or Large Screen */}
      <div className="hidden md:flex h-full justify-center items-center w-full max-w-[725px] gap-x-6">
        <AiFillStepBackward
          size={30}
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hiddden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={32}
            onClick={toggleMute}
            className="cursor-pointer"
          />
          <Slider onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
