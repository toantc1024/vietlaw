import React, { useEffect, useState } from "react";
import { HiPaperAirplane, HiUser } from "react-icons/hi";
import { useChatbotStore, useUserStore } from "../../app/store";
import { USER_RESPONSE, BOT_RESPONSE } from "../../app/constants";

const Chatbot = ({ token }) => {
  const [text, setText] = useState("");
  // const { history, addToHistory } = useChatbotStore();
  // const { user } = useUserStore();
  const [result, setResult] = useState("");
  const [listMessage, setListMessage] = useState([]);

  const getResponse = async (text) => {
    let newListMessage = [...listMessage];

    newListMessage.push({
      type: USER_RESPONSE,
      message: text,
    });
    setListMessage(newListMessage);
    // Wait 5s and response
    setTimeout(() => {
      newListMessage.push({
        type: BOT_RESPONSE,
        message: "Đây là câu trả lời",
      });
      setListMessage(newListMessage);
    }, 5000);
    setText("");

    // const response = await fetch("http://localhost:8000/api/chatbot", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     inputs: {
    //       text,
    //     },
    //   }),
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    // const reader = response.body.getReader();
    // const decoder = new TextDecoder("utf-8");

    // reader.read().then(function processText({ done, value }) {
    //   if (done) {
    //     addToHistory(result);
    //     return;
    //   }

    //   setResult((oldResult) => oldResult + decoder.decode(value));
    //   console.log(decoder.decode(value), "end\n");
    //   reader.read().then(processText);
    // });
  };

  const renderMessage = (message) => {
    return (
      <div>
        <div
          className={`w-full flex justify-start fade-in ${
            message.type === USER_RESPONSE ? "flex-row-reverse" : ""
          } gap-2`}
        >
          <div>
            {/* Placeholder */}
            <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white">
              <HiUser />
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg max-w-4xl">
            {message.message}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 gap-4 bg-white">
      <div className="rounded-lg bg-slate-100  overflow-auto flex flex-col w-full h-[calc(100vh-50px)] md:h-[550px] gap-2  p-2">
        {listMessage.map((message) => renderMessage(message))}
      </div>
      <div className="bg-slate-100 w-full flex  gap-2  rounded-lg py-2">
        <textarea
          className="px-4 py-2 w-full bg-transparent focus:outline-none font-light"
          placeholder="Hãy hỏi VieLawyer một câu về pháp luật"
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
