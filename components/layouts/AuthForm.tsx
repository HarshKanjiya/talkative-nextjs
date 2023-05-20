"use client";
import { FC, useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import InputEle from "../elements/InputEle";

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

    if (page === "LOGIN") {
      //* login logic
    } else {
      //* signup logic
    }

    setLoading(false);
  };

  const socialAction = (action: string) => {
    //* social login
  };

  return (
    <div className="w-full bg-white rounded shadow-lg p-2 sm:px-6 sm:py-3 ">
      <form
        onSubmit={() => {
          handleSubmit(onSubmint);
        }}
        className="flex flex-col gap-1 sm:gap-1.5 md:gap-2"
      >
        <InputEle label="Email" id="Email" />
      </form>
    </div>
  );
};

AuthForm.displayName = "AuthForm";
export default AuthForm;
