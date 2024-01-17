"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import { AiOutlinePlus } from "react-icons/ai";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  songs: Song[];
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const player = usePlayer();
  const uploadModal = useUploadModal();
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const onClick = () => {
    // Handle Upload Module
    if (!user) {
      return authModal.onOpen();
    }
    setIsSliderOpen(false);
    return uploadModal.onOpen();
  };

  const handleLogout = async () => {
    // Handle Logout
    const { error } = await supabaseClient.auth.signOut();

    // IF Signout: Reset any Playlist Songs
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out Successful!");
    }
  };

  const handleToggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };
  return (
    <div
      className={twMerge(
        `
        h-fit
        animation-color-change
        p-6
    `,
        className
      )}
    >
      <div className="w-full mb-4 flex justify-end items-end md:items-center md:justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="hidden gap-x-2 items-center">
          <button
            className="
            rounded-full
            p-2
            bg-white
            justify-center
            items-center    
            hover:opacity-75
            transition
          "
            onClick={() => router.push("/")}
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
            rounded-full
            p-2
            bg-white
            justify-center
            items-center    
            hover:opacity-75
            transition
          "
            onClick={() => router.push("/search")}
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
            flex
            justify-between
            items-center
            gap-x-4
        "
        >
          {user ? (
            <div className="flex relative gap-x-4 items-end justify-end">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2 hidden md:block"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
              <Button
                className="bg-white md:hidden"
                onClick={handleToggleSlider}
              >
                <BiMenu className="text-black" size={20} />
              </Button>
              {isSliderOpen && (
                <div className="bg-neutral-900 shadow-md flex flex-col gap-4 backdrop-blur-sm absolute justify-center items-center inset-0 p-4 w-auto h-[200px] rounded-lg top-12 right-0 z-10">
                  <button
                    className="
                    rounded-full
                    p-2
                    bg-white
                    justify-center
                    items-center    
                    hover:opacity-75
                    transition
                    w-10
                    h-10
                    flex
                  "
                    onClick={() => router.push("/")}
                  >
                    <HiHome className="text-black" size={20} />
                  </button>
                  <button
                    className="
                      rounded-full
                      p-2
                      bg-white
                      justify-center
                      items-center    
                      flex
                      hover:opacity-75
                      transition
                      w-10
                      h-10
                    "
                    onClick={() => router.push("/search")}
                  >
                    <BiSearch className="text-black" size={20} />
                  </button>
                  <button
                    onClick={onClick}
                    className="
                      rounded-full
                      p-2
                      bg-white
                      justify-center
                      items-center
                      flex
                      hover:opacity-75
                      transition
                      w-10
                      h-10
                    "
                  >
                    <AiOutlinePlus className="text-black" size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-transparent
                    text-neutral-300
                    font-medium
                "
                >
                  SignUp
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-white
                    px-6
                    py-2
                "
                >
                  LogIn
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
