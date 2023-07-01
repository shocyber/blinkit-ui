import React from "react";
import { offers } from "../utils/helper";

export const Offer = () => {
  return (
    <>
      {offers.map((o, i) => {
        return (
          <div
            className={`flex items-center justify-between gap-4 mb-2 bg-indigo-600 px-4 py-3 text-white`}
            key={i}
          >
            <p className="text-sm font-medium">{o.content}</p>
            {o.name}
          </div>
        );
      })}
    </>
  );
};
