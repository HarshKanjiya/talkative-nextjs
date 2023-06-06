"use client";
import { FC, useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";
import InputEle from "../elements/inputs/InputEle";
import ButtonEle from "../elements/buttons/ButtonEle";
import SocialLogin from "./SocialLogin";
import axios from "axios";

interface AuthFormProps {}

type Page = "LOGIN" | "SIGNUP";

const AuthForm: FC<AuthFormProps> = ({}) => {
  const [page, setPage] = useState<Page>("LOGIN");
  const [loading, setLoading] = useState<boolean>(false);

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

  const onSubmint: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    console.log('data :>> ', data);
    if (page === "LOGIN") {
      //* login logic
    } else {
      axios.post("/api/register", data);
    }

    setLoading(false);
  };

  const socialAction = (action: string) => {
    //* social login
  };

  return (
    <div className="w-full bg-white rounded-md shadow-lg p-5 mt-4 sm:px-6 sm:py-4 ">
      <form
        onSubmit={() => {
          handleSubmit(onSubmint);
        }}
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
        <div className="  ">
          <ButtonEle fullWidth type="submit" disabled={loading}>
            SUBMIT
          </ButtonEle>
        </div>
      </form>

      <div className="w-full mt-6 ">
        <div className="relative flex items-center justify-center ">
          <div className="w-full border-t border-gray-300 absolute z-auto" />
          <span className="bg-white px-3 text-gray-400 relative   ">
            or continue with
          </span>
        </div>
      </div>
      <div className="w-full mt-4 flex gap-4 items-center justify-center ">
        <SocialLogin icon={BsGithub} onClick={() => socialAction("github")} />
        <SocialLogin icon={BsGoogle} onClick={() => socialAction("github")} />
        <SocialLogin icon={BsFacebook} onClick={() => socialAction("github")} />
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
