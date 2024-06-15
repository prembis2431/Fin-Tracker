import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize); // This line adds an event listener to the window object for the "resize" event. 
                                                   // When the window is resized, the updateSize function is called to update the 'size' state.
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return{
    width: size[0],
    height: size[1]
  }
};
