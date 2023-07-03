import React from "react";

const Alert = ({ type, data }: { type: string; data: string | null }) => {
  return (
    <>{type === "success" ? <Success data={data} /> : <Error data={data} />}</>
  );
};
const Success = ({ data }: { data: string | null }) => {
  return (
    <div className="h-screen flex items-center bg-slate-200">
      <section className="rounded-3xl shadow-2xl">
        <div className="p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
            Your order is on the way
          </p>

          <h2 className="mt-6 text-3xl font-bold">
            Thanks for your purchase, we're getting it ready!
          </h2>

          <a
            className="mt-8 inline-block w-full rounded-full bg-green-600 py-4 text-sm font-bold text-white shadow-xl"
            href=""
          >
            Home
          </a>
        </div>
      </section>
    </div>
  );
};
const Error = ({ data }: { data: string | null }) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4"
    >
      <div className="flex items-center gap-2 text-red-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>

        <strong className="block font-medium"> Something went wrong </strong>
      </div>

      <p className="mt-2 text-sm text-red-700">{data}</p>
    </div>
  );
};

export default Alert;
