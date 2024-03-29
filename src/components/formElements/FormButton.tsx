import React from "react";

type Props = {
  text: string;
  onClick?: () => void;
};

const FormButton = ({ text, onClick }: Props) => {
  return (
    <button
      type="submit"
      onClick={() => onClick && onClick()}
      className="mt-3 flex w-full uppercase justify-center bg-royal-blue py-2 px-4 text-sm font-bold text-gray-1 shadow-sm hover:bg-dark-royal-blue disabled:bg-blue-200"
    >
      {text}
    </button>
  );
};

export default FormButton;
