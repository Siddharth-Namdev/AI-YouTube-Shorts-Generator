"use client"
import React, { useState } from "react";
import Topic from "./_components/Topic";

const CreateNewVideo = () => {

const [formData , setFormData] = useState();  // user jo jo v select krega , wo isme save hoga
  const onHandleInputChange = (fieldName,fieldValue)=>{
    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
    console.log(formData);
  }
  return (
    <div>
      <h2 className="text-3xl ">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8" >
        <div className="col-span-2 p-7 border rounded-2xl">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />
          {/* Video Image Style */}

          {/*     Voice  */}

          {/* Captions */}
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
