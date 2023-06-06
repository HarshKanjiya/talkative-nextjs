"use client";
import { FC } from "react";
import { IconType } from "react-icons";

interface SocialLoginProps {
  icon: IconType;
  onClick: () => void;
}

const SocialLogin: FC<SocialLoginProps> = ({ icon: Icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" p-4 rounded-full flex items-center justify-center shadow-sm border border-white  focus:outline-1 focus:outline-gray-300 hover:shadow-lg transition-all hover:border-gray-100 "
    >
      <Icon size={22} color="#343434" />
    </button>
  );
};

SocialLogin.displayName = "SocialLogin";
export default SocialLogin;
