export const updateScreenWidth = (setScreenWidth) => {
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
};
