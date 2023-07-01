import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { shuffleItems } from "../../utils/helper";
import { hideAddressBar } from "../../store/address";
import { showPayment } from "../../store/payment";
import { show } from "../../store/modal";
import { hideCart } from "../../store/ui";
const times = [10, 15, 20, 25, 30, 35, 40, 22, 33];
const AddressBar = () => {
  const dispatch = useAppDispatch();

  const { city, state, postcode } = useAppSelector(
    (state) => state.location.address
  );
  const [info, setInfo] = useState<any | null>({
    name: "",
    line1: "",
    line2: "",
    city,
    state,
    postcode,
  });
  const [isFinal, setIsFinal] = useState(false);
  const onAddressInputChange = (e: any) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  const onSubmite = () => {
    if (
      info.name === "" ||
      info.line1 === "" ||
      info.line2 === "" ||
      info.city === "" ||
      info.state === "" ||
      info.postcode === ""
    ) {
      dispatch(show({ type: "error", data: "Please Enter All Details" }));
    } else {
      setIsFinal(true);
    }
  };

  const FinalAddress = () => {
    return (
      <div className="flex-1">
        <div className="space-y-3 my-3">
          <div className="bg-white">
            <div className="flex justify-between">
              <div className="font-bold text-xl text-black pt-5 px-4">
                Final Address
              </div>
              <div
                className="font-bold text-md text-indigo-600 pt-5 px-4"
                onClick={() => setIsFinal(false)}
              >
                Change
              </div>
            </div>
            <div className="px-4 text-xs space-y-2 py-2">
              <p className="font-semibold text-sm">
                {`${info.line1}, ${info.line2} ,${info.city} ,${info.state}-${info.postcode}`}
              </p>
            </div>
          </div>
          <div className="bg-white border-y _border-muted">
            <div className="flex flex-col px-4 pt-5">
              <div className="flex justify-between _text-muted text-xs">
                <p className="text-sm _text-default font-bold mb-1">
                  Delivery will be Attemp in {shuffleItems(times)[0]} minutes.
                  Be Ready to Recieve Your Order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
          <h2 className="font-extrabold text-xl _text-default">
            Deliver To {info.city}-{info.postcode}
          </h2>
          <IoClose
            size={24}
            className="cursor-pointer"
            onClick={() => dispatch(hideAddressBar())}
          />
        </div>
        {isFinal ? (
          <FinalAddress />
        ) : (
          <>
            <div className="flex-1">
              <div className="space-y-3 my-3">
                <div className="bg-white">
                  <div className="font-bold text-xl text-black pt-5 px-4 font-caros-md">
                    Contact Info
                  </div>
                  <div className="px-4 text-xs space-y-2 py-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black font-caros-md">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="_input"
                        onChange={onAddressInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-3 my-3">
                    <div className="bg-white">
                      <div className="font-bold text-xl text-black pt-5 px-4 font-caros">
                        Address
                      </div>
                      <div className="px-4 text-sm space-y-2 py-2">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-black font-caros-md">
                            Address Line 1
                          </label>

                          <input
                            id="line1"
                            type="text"
                            className="_input"
                            onChange={onAddressInputChange}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-black  font-caros-md">
                            Address Line 2
                          </label>

                          <input
                            id="line2"
                            type="text"
                            className="_input "
                            onChange={onAddressInputChange}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-black  font-caros-md">
                              PostCode
                            </label>

                            <input
                              id="postcode"
                              type="number"
                              defaultValue={info.postcode}
                              className="_input "
                              onChange={onAddressInputChange}
                            />
                          </div>{" "}
                          <div>
                            <label className="block mb-2 text-sm font-medium text-black  font-caros-md">
                              City
                            </label>

                            <input
                              id="city"
                              type="text"
                              defaultValue={info.city}
                              className="_input "
                              onChange={onAddressInputChange}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-black  font-caros-md">
                            State
                          </label>
                          <input
                            id="state"
                            type="text"
                            defaultValue={info.state}
                            className="_input "
                            onChange={onAddressInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className=" bg-white flex items-center justify-between p-4">
          <h2 className="font-extrabold text-xl _text-default font-caros-md">
            Next Step - Checkout
          </h2>
        </div>
        <div
          className="sticky bottom-0 px-4 pt-2 pb-4 min-h-[68px] _shadow_sticky"
          onClick={isFinal ? handleChange : onSubmite}
        >
          <div className="bg-[#0c831f] cursor-pointer text-white flex items-center px-3 py-3 rounded-[4px] font-medium text-[14px]">
            <div className="ml-auto flex items-center font-bold font-caros-bold text-sm">
              Proceed
              <FiChevronRight size={18} className="ml-2" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AddressBar;
