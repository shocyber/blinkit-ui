import React from "react";
 
import instance from "../utils/instance";

export const Offer = () => {
  const [offers, setoffers] = React.useState([]);
  const fetchOffers = async () => {
    const { data } = await instance.get("/offers");
    setoffers(data.offers);
  };
  React.useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <>
      {offers.length > 0
        ? offers.map((o: any, i) => {
            return (
              <div
                className={`flex items-center justify-between gap-4 mb-2 bg-indigo-600 px-4 py-3 text-white`}
                key={i}
              >
                <p className="text-sm font-medium">{o.content}</p>
                {o.name}
              </div>
            );
          })
        : null}
    </>
  );
};
