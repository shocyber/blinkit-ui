import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { show } from "../../store/modal";
import { hidePayment } from "../../store/payment";
import { Offer } from "../Offer";
import { YearPicker, MonthPicker } from "react-dropdown-date";
import instance from "../../utils/instance";
import { hideLoader, showLoader } from "../../store/loader";

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const { totalAmount, totalQuantity, billAmount } = useAppSelector(
    (state) => state.cart
  );
  const device = useAppSelector((state) => state.device.device);
  const [date, setDate] = useState({ year: "", month: "" });

  const expiry = () => {
    let month;
    if (date.month.length === 1) {
      month = "0" + date.month;
    }
    const year = new Date().getFullYear();
    return `${month}/${year}`;
  };
  const [info, setInfo] = useState<any | null>({
    name: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e: any) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };

  const handlePaymentSubmit = async () => {
    info.expiry = expiry();
    if (
      info.name === "" ||
      info.phone === "" ||
      info.cardNumber === "" ||
      info.expiry === "" ||
      info.cvv === ""
    ) {
      dispatch(show({ type: "error", data: "Please Enter All Details" }));
      return;
    }
    if (info.cardNumber.length < 14 || info.cardNumber.length < 16) {
      dispatch(
        show({ type: "error", data: "Card Number Must Be 14 or 16 Digits" })
      );
      return;
    }

    if (info.cvv.length !== 3) {
      dispatch(show({ type: "error", data: "CVV Must Be 3 Digits" }));
      return;
    }
    dispatch(showLoader());
    await instance.post(`/payment`, {
      info,
      device,
    });
    dispatch(
      show({ type: "success", data: "Your Order Has Been Successfull Placed" })
    );
    dispatch(hideLoader());
    dispatch(hidePayment());
  };

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 overflow-hidden p-4">
      <div
        className="absolute z-10 inset-0 bg-black bg-opacity-[.65]"
        onClick={() => dispatch(hidePayment())}
      />
      <aside className="_drawer flex flex-col overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 bg-white flex items-center justify-between p-4">
          <h2 className="font-extrabold text-2xl _text-default">Checkout</h2>
          <IoClose
            size={24}
            className="cursor-pointer"
            onClick={() => dispatch(hidePayment())}
          />
        </div>

        <div className="flex-1">
          <div className="space-y-3 my-3">
            <div className="bg-white border-y _border-muted">
              <Offer />
            </div>
            <div className="bg-white">
              <div className="font-bold text-xl text-black pt-5 px-4 font-caros-bold">
                Payment
              </div>
              <div className="rounded-lg bg-white p-4 shadow-lg lg:col-span-3 lg:p-12">
                <div className="relative px-3 my-2">
                  <div className="my-2">
                    <input
                      className="w-full font-semibold rounded-sm text-sm block p-2 text-gray-900 border border-gray-300 bg-gray-5 font-caros-md"
                      placeholder="Name on Card"
                      type="text"
                      id="name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="my-2">
                    <input
                      className="w-full font-semibold rounded-sm text-sm block p-2 text-gray-900 border border-gray-300 bg-gray-5 font-caros-md"
                      placeholder="Phone Number"
                      type="tel"
                      id="phone"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="my-2">
                    <input
                      className="w-full font-semibold rounded-sm text-sm block p-2 text-gray-900 border border-gray-300 bg-gray-5 font-caros-md"
                      placeholder="Card Number"
                      type="tel"
                      id="cardNumber"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="Month"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Expiry Month
                      </label>
                      <MonthPicker
                        endYearGiven={true}
                        year={new Date().getFullYear()}
                        required={true}
                        defaultValue="MM"
                        value={1}
                        numeric={false}
                        onChange={(month: any) => {
                          setDate((prev) => ({ ...prev, month }));
                        }}
                        classes="_input font-caros"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Year"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Expiry Year
                      </label>
                      <YearPicker
                        defaultValue={"YYYY"}
                        start={2023}
                        end={2099}
                        value={2023}
                        required
                        onChange={(year: any) => {
                          setDate((prev) => ({ ...prev, year }));
                        }}
                        id={"year"}
                        classes={`_input font-caros`}
                        optionClasses={"w-[120px]"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="CVV"
                        className="block text-sm font-medium text-gray-900"
                      >
                        CVV
                      </label>
                      <input
                        className="_input"
                        id="cvv"
                        maxLength={3}
                        minLength={3}
                        defaultValue={""}
                        placeholder="CVV"
                        type="password"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="font-bold text-xl text-black pt-5 px-4">
                Accepted Cards
              </div>
              <div className="px-4 text-xs space-y-2 py-2">
                <ul className="flex inline">
                  {AcceptedCards.map((i) => (
                    <img width={75} src={i} key={i} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white px-4 pt-2 pb-4 min-h-[68px] _shadow_sticky">
          <div className="bg-[#0c831f] cursor-pointer text-white flex items-center px-3 py-3 rounded-[4px] font-medium text-[14px]">
            <div className="font-bold">{totalQuantity} Items</div>
            <div className="font-bold">&nbsp; &middot; &nbsp;</div>
            <div>
              <span className="font-extrabold">₹{billAmount}</span>
              <del className="text-sm ml-1">₹{totalAmount}</del>
            </div>
            <div
              className="ml-auto flex items-center font-bold"
              onClick={handlePaymentSubmit}
            >
              Proceed <FiChevronRight size={18} className="ml-2" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PaymentPage;

const AcceptedCards = [
  "amex.webp",
  "maestro.webp",
  "mastercard.webp",
  "visa.webp",
  "rupay.webp",
];
