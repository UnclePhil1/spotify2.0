"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
// import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
// import { ProductWithPrice } from "@/types";

// interface ModalProviderProps {
//   products: ProductWithPrice[];
// }

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  //   ServerSide rerendering...
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      {/* <SubscribeModal products={products} /> */}
      <UploadModal />
    </>
  );
};

export default ModalProvider;
