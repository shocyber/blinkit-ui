import React from "react";

export default function Spinner({ type }: { type?: "spinner" | "bounce" }) {
  const loaderImg = (
    <span className="w-3 h-3 rounded-full my-6 mx-auto block relative text-[#0c831f] _loader"></span>
  );
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-70">
      {type === "spinner" ? (
        <div className="w-20 h-20 border-4 border-solid border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        loaderImg
      )}
    </div>
  );
}
