import Image from "next/image";
import React, { useState } from "react";

const options = [
  {
    name: "Realistic",
    image: "/girl 1.jpg",
  },
  {
    name: "Realistic",
    image: "/girl 2.jpg",
  },
  {
    name: "Realistic",
    image: "/boy 1.jpg",
  },
  {
    name: "Cinematic",
    image: "/cinematic1.jpg",
  },
  {
    name: "Realistic",
    image: "/realastics1.jpg",
  },
  {
    name: "Realistic",
    image: "/nature1.jpg",
  },
];

const VideoStyle = ({ onHandleInputChange }) => {
  const [selectedStyle, setSelectedStyle] = useState();

  return (
    <div className="mt-5">
      <h2>VideoStyle</h2>
      <p className="text-sm text-gray-400 mb-1"> Select Video Style</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {options?.map((option, index) => (
          <div
            className="relative"
            onClick={() => {
              setSelectedStyle(option.name);
              onHandleInputChange("videoStyle", option.name);
            }}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={500}
              height={120}
              className={`object-cover h-[80px] lg:h-[110px] xl:h-[180px] rounded-lg p-1
              hover:border border-gray-400 cursor-pointer
              ${option.name == selectedStyle && "border"}  // jb sbhi image k name alag honge tb select krne pr sirf ek image select hogi
              `}
            />

            <h2 className="absolute bottom-1 text-center w-full ">
              {option.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStyle;
