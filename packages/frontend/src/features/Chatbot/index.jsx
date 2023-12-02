import React, { useEffect, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";

const Chatbot = ({ token }) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [listMessage, setListMessage] = useState([]);
  useEffect(() => {
    // console.log(result);
  }, [result]);
  const getResponse = async (text) => {
    setResult("");
    const response = await fetch("http://localhost:8000/api/chatbot", {
      method: "POST",
      body: JSON.stringify({
        inputs: {
          text,
        },
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    reader.read().then(function processText({ done, value }) {
      if (done) {
        console.log("Stream complete");
        let newListMessage = [...listMessage];
        newListMessage.push(result);
        setListMessage(newListMessage);

        return;
      }

      setResult((oldResult) => oldResult + decoder.decode(value));
      console.log(decoder.decode(value), "end\n");
      reader.read().then(processText);
    });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 gap-4 bg-white">
      <div className="rounded-lg bg-slate-100  overflow-auto flex flex-col w-full h-[calc(100vh-50px)] md:h-[550px] gap-2  p-2">
        {[...new Array(2)].map((_, i) => {
          return (
            <div>
              <div
                className={`w-full flex justify-start fade-in ${
                  i % 2 == 0 ? "flex-row-reverse" : ""
                } gap-2`}
              >
                <div>
                  {/* Placeholder */}
                  <div className="w-[50px] h-[50px] rounded-full bg-white"></div>
                </div>
                <div className="p-4 bg-white rounded-lg max-w-4xl">
                  Creating some text Creating some text Creating some text
                  Creating some text Creating some text Creating some text
                  Creating some text Creating some text Creating some text
                  Creating some text Creating some text Creating some text
                  Creating some text Creating some text Creating some text
                  Creating some text Creating some text Creating some text
                  Creating some text Creating some text
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-slate-100 w-full flex  gap-2  rounded-lg py-2">
        <textarea
          className="px-4 py-2 w-full bg-transparent focus:outline-none font-light"
          placeholder="Ask a question"
          type="text"
          value={text}
          onChange={(e) => {
            const value = e.target.value;
            setText(value);
          }}
        />
        <button
          onClick={() => {
            getResponse(text).then((data) => {
              console.log(data);
            });
          }}
          className="p-4 hover:text-gray-700  flex items-center justify-center"
        >
          <HiPaperAirplane className="rotate-[90deg]" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
