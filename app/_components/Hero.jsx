import { Button } from "@/components/ui/button";
import React from "react";
import Authentication from "./Authentication";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-6xl mt-24">
        {" "}
        AI Youtube Short Video Generator
      </h1>
      <p className="mt-4 text-2xl text-center ">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias nemo
        amet repudiandae eveniet voluptates quae facilis dicta, aut nesciunt.
      </p>

      <div className="mt-7 flex gap-8">
        <Button className="cursor-pointer" size="lg" variant="secondary">
          Explore
        </Button>
        <Authentication>
          <Button className="cursor-pointer">Get Started</Button>
        </Authentication>
      </div>
    </div>
  );
};

export default Hero;
