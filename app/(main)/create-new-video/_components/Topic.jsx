"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SparkleIcon } from "lucide-react";
import axios from "axios";
import { useAuthContext } from "@/app/provider";

const Suggestions = [
  "Historical Story",
  "Kids Story",
  "Movie Stories",
  "AI Innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  "tech Breakthoughts",
  "True Crime Stories",
  "Fantasy Adventures",
  "Science Experiments",
  "Motivationals Stories",
];

const Topic = ({ onHandleInputChange }) => {
  const [selectedTopic, setSelectedTopic] = useState();

  const [selectScriptIndex, setSelectedScriptIndex] = useState();
  const [script, setScript] = useState();
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();

  // generate Script according to select topic and title
  const GenerateScript = async () => {
    if (user?.credits <= 0) {
      toast("Please add more credits!");
      return;
    }
    setLoading(true);
    setSelectedScriptIndex(null);
    try {
      const result = await axios.post("/api/generate-script", {
        topic: selectedTopic,
      });
      console.log(result.data);
      setScript(result.data?.scripts);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="mb-1">Project Title</h2>
      <Input
        placeholder="Enter Project Title"
        onChange={(event) => onHandleInputChange("title", event.target.value)}
      />
      <div className="mt-5">
        <h2> Video Topic</h2>

        <p className="text-sm text-gray-600"> Select Topic</p>

        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestion">
            <div>
              {Suggestions.map((suggestion, index) => (
                <Button
                  variant="outline"
                  key={index}
                  className={`m-1 ${suggestion === selectedTopic ? "bg-secondary border-white" : ""}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                placeholder="Enter Your Topic"
                onChange={(event) =>
                  onHandleInputChange("topic", event.target.value)
                }
              />
            </div>
          </TabsContent>
        </Tabs>

        {script?.length > 0 && (
          <div className="">
            <h2> Select The Script</h2>
            <div className="grid grid-cols-2 gap-5 mt-1">
              {script?.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer
                ${selectScriptIndex === index && "border-white bg-secondary"}
                `}
                  // onClick={()=>setSelectedScriptIndex(index)

                  // }
                  onClick={() => {
                    setSelectedScriptIndex(index);
                    onHandleInputChange("script", item.contents); // ✅ update formData
                  }}
                >
                  <h2 className="line-clamp-4 text-sm text-gray-400">
                    {item.contents}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {!script && (
        <Button
          className="mt-3"
          size="sm"
          disabled={loading}
          onClick={GenerateScript}
        >
          {" "}
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SparkleIcon />
          )}{" "}
          Generate Script{" "}
        </Button>
      )}
    </div>
  );
};

export default Topic;
