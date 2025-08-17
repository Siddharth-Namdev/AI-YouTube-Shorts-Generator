import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Authentication from "./Authentication";

export const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center gap-3">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <h2 className="text-2xl font-bold"> Video Gen</h2>
      </div>
      <Authentication>
        <Button className="cursor-pointer">Get Started</Button>
      </Authentication>
    </div>
  );
};
