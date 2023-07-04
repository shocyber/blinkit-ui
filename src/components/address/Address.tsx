import { useState } from "react";
import { IoClose } from "react-icons/io5";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { hideAddressBar } from "../../store/address";
import { showPayment } from "../../store/payment";
import { show } from "../../store/modal";
import PaymentPage from "../payment/PaymentPage";
import { GrLocation } from "react-icons/gr";
const AddressBar = () => {
  const dispatch = useAppDispatch();

  const { city, state, postcode, country } = useAppSelector(
    (state) => state.location.address
  );
  const [info, setInfo] = useState<any | null>({
    address: "",
    floor: "",
    landmark: "",
    receiverName: "",
    receiverPhone: "",
  });
  const [isFinal, setIsFinal] = useState(false);
  const onAddressInputChange = (e: any) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  const onSubmite = () => {
    if (
      info.address === "" ||
      info.floor === "" ||
      info.landmark === "" ||
      info.receiverName === "" ||
      info.receiverPhone === ""
    ) {
      dispatch(show({ type: "error", data: "Please Enter All Details" }));
    } else {
      setIsFinal(true);
    }
  };

  const handleChange = () => {
    dispatch(hideAddressBar());
    dispatch(showPayment());
  };
  return (
    <div className="fixed inset-0 h-screen max-w-screen z-50 overflow-hidden p-4">
      <div
        className="absolute z-10 inset-0 bg-black bg-opacity-[.65]"
        onClick={() => dispatch(hideAddressBar())}
      />
      <aside className="_drawer flex flex-col overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 bg-white flex items-center justify-between p-4">
          <figure className="font-extrabold text-md _text-default ">
            <div className="flex flex-inline">
              <GrLocation size={14} className="mt-1" />
              <p className="mx-1">
                Deliver To {city}-{postcode}
              </p>
            </div>

            <p className="text-xs">
              {state}, {country}
            </p>
          </figure>

          <IoClose
            size={24}
            className="cursor-pointer"
            onClick={() => dispatch(hideAddressBar())}
          />
        </div>
        {isFinal ? (
          <PaymentPage phone={info.receiverPhone} setIsFinal={setIsFinal} />
        ) : (
          <>
            <div className="flex-1 bg-white">
              <div className="space-y-3 my-3">
                <div className="">
                  <div className=" text-black p-1 rounded-2xl  font-caros-light">
                    <fieldset className="flex flex-wrap gap-4 mt-4">
                      <div>
                        <input
                          type="radio"
                          name="ColorOption"
                          className="peer hidden"
                          defaultChecked
                        />

                        <label
                          htmlFor="ColorBlack"
                          className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-white px-2 py-1 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                        >
                          <p className="text-sm font-medium font-caros">Home</p>
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="ColorOption"
                          value="ColorRed"
                          id="ColorRed"
                          className="peer hidden"
                          defaultChecked={false}
                        />

                        <label
                          htmlFor="ColorRed"
                          className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-white px-2 py-1 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                        >
                          <p className="text-sm font-medium font-caros">Work</p>
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="ColorOption"
                          value="ColorBlue"
                          id="ColorBlue"
                          className="peer hidden"
                          defaultChecked={false}
                        />

                        <label
                          htmlFor="ColorBlue"
                          className="flex font-caros cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-white px-2 py-1 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                        >
                          <p className="text-sm font-medium font-caros">
                            Hotel
                          </p>
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="ColorOption"
                          value="ColorGold"
                          id="ColorGold"
                          className="peer hidden"
                          defaultChecked={false}
                        />

                        <label
                          htmlFor="ColorGold"
                          className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-white px-2 py-1 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                        >
                          <p className="text-sm font-medium font-caros">
                            Freinds & Family
                          </p>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-3 my-3">
                    <div className="bg-white">
                      <div className="px-4 text-sm space-y-2 py-2">
                        <div className="relative">
                          <input
                            id="address"
                            defaultValue={info.address}
                            type="text"
                            className="font-caros block px-2 py-2.5 bg-[#f7f8fafe] w-full text-md text-black rounded-lg border-[1px] border-[#c9c9cafe] focus:border-black appearance-none  focus:outline-none focus:ring-0 focus:border-border peer"
                            placeholder=" "
                            onChange={onAddressInputChange}
                          />
                          <label
                            htmlFor="address"
                            className="absolute font-semibold text-md text-slate-600  duration-300 font-caros origin-[0] bg-[#f7f8fafe]  px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Complete Address
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            id="floor"
                            defaultValue={info.floor}
                            type="text"
                            className="font-caros block px-2 py-2.5 bg-[#f7f8fafe] w-full text-md text-black rounded-lg border-[1px] border-[#c9c9cafe] focus:border-black appearance-none  focus:outline-none focus:ring-0 focus:border-border peer"
                            placeholder=" "
                            onChange={onAddressInputChange}
                          />
                          <label
                            htmlFor="floor"
                            className="absolute font-semibold text-md text-slate-600  duration-300 font-caros origin-[0] bg-[#f7f8fafe]  px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Floor (optional)
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            id="landmark"
                            type="text"
                            defaultValue={info.landmark}
                            className="font-caros block px-2 py-2.5 bg-[#f7f8fafe] w-full text-md text-black rounded-lg border-[1px] border-[#c9c9cafe] focus:border-black appearance-none  focus:outline-none focus:ring-0 focus:border-border peer"
                            placeholder=" "
                            onChange={onAddressInputChange}
                          />
                          <label
                            htmlFor="landmark"
                            className="absolute font-semibold text-md text-slate-600  duration-300  font-caros origin-[0] bg-[#f7f8fafe]  px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            NearBy Landmark (optional)
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            id="receiverName"
                            type="text"
                            defaultValue={info.receiverName}
                            className="block font-caros px-2 py-2.5 bg-[#f7f8fafe] w-full text-md text-black rounded-lg border-[1px] border-[#c9c9cafe] focus:border-black appearance-none  focus:outline-none focus:ring-0 focus:border-border peer"
                            placeholder=" "
                            onChange={onAddressInputChange}
                          />
                          <label
                            htmlFor="receiverName"
                            className="absolute font-semibold text-md text-slate-600  duration-300 font-caros origin-[0] bg-[#f7f8fafe]  px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Receiver's Name *
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            defaultValue={info.receiverPhone}
                            type="text"
                            id="receiverPhone"
                            className="block font-caros px-2 py-2.5 bg-[#f7f8fafe] w-full text-md text-black rounded-lg border-[1px] border-[#c9c9cafe] focus:border-black appearance-none  focus:outline-none focus:ring-0 focus:border-border peer"
                            placeholder=" "
                            maxLength={10}
                            onChange={onAddressInputChange}
                          />
                          <label
                            htmlFor="receiverPhone"
                            className="absolute font-semibold font-caros text-md text-slate-600  duration-300  origin-[0] bg-[#f7f8fafe]  px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Receiver's Phone (optional)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div
          className="sticky bottom-0 text-center bg-white px-4 pt-2 pb-4 min-h-[68px] _shadow_sticky"
          onClick={isFinal ? handleChange : onSubmite}
        >
          <div className="bg-[#0c831f] cursor-pointer text-white px-3 py-3 rounded-lg font-medium text-[14px]">
            <div className="font-bold text-lg">Save Address</div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AddressBar;
