import React, { FC } from "react";

type ButtonProps = {
  text: string;
};

export const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button
      className="bg-red-500 p-2 rounded-md mt-4"
      type="submit"
    >
      {text}
    </button>
  );
};
