import { useEffect } from "react";

const useScrollLock = (isLocked) => {
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-scroll-locked", isLocked);
  }, [isLocked]);

  return null;
};

export default useScrollLock;
