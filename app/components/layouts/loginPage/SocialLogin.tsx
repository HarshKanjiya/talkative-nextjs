"use client";
import { FC } from "react";
import { IconType } from "react-icons";

interface SocialLoginProps {
  icon: IconType;
  onClick: () => void;
  loading: boolean;
}

const SocialLogin: FC<SocialLoginProps> = ({
  icon: Icon,
  onClick,
  loading,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-full flex items-center justify-center shadow-sm border border-gray-100  focus:outline-1 focus:outline-gray-300 hover:shadow-lg transition-all hover:border-gray-100 ${loading && "opacity-5 cursor-not-allowed shadow-none "}`}
    >
      <Icon size={22} />
    </button>
  );
};

SocialLogin.displayName = "SocialLogin";
export default SocialLogin;
