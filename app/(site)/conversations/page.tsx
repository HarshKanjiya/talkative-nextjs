"use client";
import ButtonEle from "@/app/components/elements/buttons/ButtonEle";
import { signOut } from "next-auth/react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    
  return (
    <div>
      page
      <button onClick={() => signOut()}>by</button>

      <ButtonEle  > qwert  </ButtonEle>
    </div>
  );
};

page.displayName = "page";
export default page;
