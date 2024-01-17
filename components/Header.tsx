"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import {
  RxCaretLeft,
  RxCaretRight,
  RxThickArrowLeft,
  RxThickArrowRight,
} from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const player = usePlayer();

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

  const [isSliderOpen, setIsSliderOpen] = useState(false);

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
      <div className="w-full mb-4 flex items-center justify-between">
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
        {/* <div className="relative float-right">
          <button
            className="rounded-full p-2 bg-white justify-center items-center hover:opacity-75 transition"
            onClick={handleToggleSlider}
          >
            {isSliderOpen ? (
              <RxThickArrowRight size={20} className="text-black" />
            ) : (
              <RxThickArrowLeft size={20} className="text-black" />
            )}
          </button>
          {isSliderOpen && (
            <div className="absolute flex gap-4 p-2 top-0 right-0 bg-neutral-600 rounded-full w-auto transition-transform transform translate-x-full">
              <button
                className="rounded-full p-2 bg-white justify-center items-center hover:opacity-75 transition"
                onClick={() => router.push("/")}
              >
                <HiHome className="text-black" size={15} />
              </button>
              <button
                className="rounded-full p-2 bg-white justify-center items-center hover:opacity-75 transition"
                onClick={() => router.push("/search")}
              >
                <BiSearch className="text-black" size={15} />
              </button>
              <div
                className="
            flex
            justify-between
            items-center
            gap-x-4
        "
              >
                {user ? (
                  <div className="flex gap-x-4 items-center">
                    <Button
                      onClick={handleLogout}
                      className="bg-white px-6 py-2"
                    >
                      Logout
                    </Button>
                    <Button
                      onClick={() => router.push("/account")}
                      className="bg-white"
                    >
                      <FaUserAlt />
                    </Button>
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
          )}
        </div> */}
        <div className="flex md:hidden gap-x-2 items-center">
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
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
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
