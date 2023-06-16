"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";

import InputEle from "../../elements/inputs/InputEle";
import ButtonEle from "../../elements/buttons/ButtonEle";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthFormProps {}

type Page = "LOGIN" | "SIGNUP";

const AuthForm: FC<AuthFormProps> = ({}) => {
  const session = useSession();
  const router = useRouter();
  const [page, setPage] = useState<Page>("LOGIN");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const changePage = useCallback(() => {
    if (page === "LOGIN") {
      setPage("SIGNUP");
    } else {
      setPage("LOGIN");
    }
  }, [page]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (page === "SIGNUP") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setLoading(false));
    }

    if (page === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/conversations");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full bg-gray-100 rounded-md  p-5 mt-4 sm:px-6 sm:py-4 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 sm:w-full sm:gap-1.3 md:gap-1.6"
      >
        {page === "SIGNUP" && (
          <InputEle
            label="Name"
            id="name"
            type="text"
            register={register}
            errors={errors}
          />
        )}
        <InputEle
          label="Email Address"
          id="email"
          type="email"
          register={register}
          errors={errors}
        />
        <InputEle
          label="Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
        />
        <div>
          <ButtonEle disabled={loading} fullWidth type="submit">
            {page === "LOGIN" ? "Sign in" : "Register"}
          </ButtonEle>
        </div>
      </form>

      <div className="w-full mt-6 ">
        <div className="relative flex items-center justify-center ">
          <div className="w-full border-t border-gray-300 absolute z-auto" />
          <span className="bg-gray-100 px-3 text-gray-400 relative   ">
            or continue with
          </span>
        </div>
      </div>
      <div className="w-full mt-4 flex gap-4 items-center justify-center ">
        <SocialLogin
          icon={SiGithub}
          onClick={() => socialAction("github")}
          loading={loading}
        />
        <SocialLogin
          icon={FcGoogle}
          onClick={() => socialAction("google")}
          loading={loading}
        />
        {/* <SocialLogin icon={FaFacebook} onClick={() => socialAction("facebook")} /> */}
      </div>
      <div className="flex gap-3 justify-center mt-5 ">
        <p>
          {page === "LOGIN" ? "New to Talkative?" : "Already have an Account?"}
        </p>
        <p
          className="underline cursor-pointer text-emerald-500 "
          onClick={changePage}
        >
          {page === "LOGIN" ? "create account" : "login"}
        </p>
      </div>
    </div>
  );
};

AuthForm.displayName = "AuthForm";
export default AuthForm;
