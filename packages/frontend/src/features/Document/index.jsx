import React, { useEffect, useState } from "react";
import { usePhapDienStore } from "../../app/store";

const Document = () => {
  const { phapDien } = usePhapDienStore();
  console.log(phapDien.chude);
  const [chude, setChude] = useState(-1);
  const [demuc, setDemuc] = useState(-1);
  const [deMucData, setDeMucData] = useState({ __html: "" });
  const loadDeMucByChuDe = (chudeId) => {
    if (chude === -1) {
      return (
        <option selected value={-1}>
          {" "}
          Chọn để mục
        </option>
      );
    } else {
      return phapDien.demuc
        .filter((item) => item[2] === chudeId)
        .map((item) => {
          return <option value={item[0]}>{item[1]}</option>;
        });
    }
  };

  useEffect(() => {
    if (demuc !== -1) {
      (async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/phapdien/laydemuc`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ demuc: demuc }),
          }
        );
        const data = await response.text();
        let newDeMucData = { __html: data };
        setDeMucData(newDeMucData);
      })();
    }
  }, [demuc]);

  return (
    <div className="h-full w-full p-4 flex flex-col gap-2 overflow-hidden">
      <div className="flex gap-4 w-auto">
        <div>
          {" "}
          <select
            onChange={(e) => {
              setChude(e.target.value);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={-1}>
              {" "}
              Chọn chủ đề
            </option>
            {phapDien &&
              phapDien.chude.map((item) => {
                return <option value={item[0]}>{item[1]}</option>;
              })}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              setDemuc(e.target.value);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={-1}>
              {" "}
              Chọn để mục
            </option>
            {chude !== -1 && loadDeMucByChuDe(chude)}
          </select>
        </div>
      </div>

      <div className="h-full w-full flex flex-col gap-2 overflow-auto">
        <div className=" px-4 py-4 rounded-lg flex flex-col gap-4">
          <div className=" border-[1px] rounded-lg p-2 h-full">
            {deMucData && (
              <div
                className="p-2 w-full"
                style={{ fontFamily: "Merriweather" }}
                dangerouslySetInnerHTML={deMucData}
              />
              // <iframe srcDoc={deMucData} title="My Frame" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
