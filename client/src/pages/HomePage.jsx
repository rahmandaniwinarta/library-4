import React from "react";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const { NIM } = useSelector((state) => state.userSlice.value);

  return <div> test </div>;
};
