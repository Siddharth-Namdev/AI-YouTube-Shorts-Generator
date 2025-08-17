"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Authentication from "./Authentication";
import { useAuthContext } from "../provider";
import Link from "next/link";

export const Header = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center gap-3">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <h2 className="text-2xl font-bold"> Video Gen</h2>
      </div>
      {!user ? (
        <Authentication>
          <Button className="cursor-pointer">Get Started</Button>
        </Authentication>
      ) : (
        <div className="flex items-center gap-3">
          <Link href={"/dashborad"}>
            {" "}
            <Button className="cursor-pointer">Dashboard</Button>
          </Link>

          <Image
            src={user?.photoURL}
            alt="user Image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
};
