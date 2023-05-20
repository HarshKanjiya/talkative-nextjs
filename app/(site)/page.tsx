import Image from "next/image";
import Logo from "@/images/logo.png";
import AuthForm from "@/components/layouts/AuthForm";

export default function Home() {
  return (
    <div className=" w-full flex justify-center items-center py-20  min-h-full bg-gray-100">
      <div className="w-max" >
        <Image
          height="48"
          width="48"
          alt="Logo"
          src={Logo}
          className="mx-auto w-auto "
        />
        <h2 className=" text-2xl font-bold py-2 pt-4 ">
          Sign in to your Account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
