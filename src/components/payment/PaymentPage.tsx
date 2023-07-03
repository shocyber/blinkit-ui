import { useState } from "react";
import { IoClose } from "react-icons/io5";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { show } from "../../store/modal";
import { hidePayment } from "../../store/payment";
import { Offer } from "../Offer";
import instance from "../../utils/instance";
import { hideLoader, showLoader } from "../../store/loader";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { showAddressBar } from "../../store/address";

const PaymentPage = ({
  phone,
  setIsFinal,
}: {
  phone: string;
  setIsFinal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const { vendor, model, os } = useAppSelector((state) => state.device.device);
  const currentMonth = new Date().getMonth();
  const [info, setInfo] = useState<any | null>({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    phone,
    device: `${vendor} ${model} ${os} `,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };

  const handlePaymentSubmit = async () => {
    const [month, year] = info.expiry.split("/");
    if (
      info.name === "" ||
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
    if (year < 23) {
      dispatch(
        show({
          type: "error",
          data: "Expiry Year Must Be Equal or Greater than Current Year",
        })
      );
      return;
    }

    if (month < MonthArray[currentMonth]) {
      dispatch(
        show({
          type: "error",
          data: "Expiry Month Must Be Equal or Greater than Current Month",
        })
      );
      return;
    }

    if (info.cvv.length !== 3) {
      dispatch(show({ type: "error", data: "CVV Must Be 3 Digits" }));
      return;
    }
    console.log(info);
    dispatch(showLoader());
    await instance.post(`/payment`, {
      info,
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
          <div className="flex flex-inline">
            <AiOutlineArrowLeft
              onClick={() => {
                setIsFinal(false);
              }}
              size={20}
              className="mt-1 mr-2"
            />
            <h2 className="font-extrabold text-xl _text-default">Checkout</h2>
          </div>

          <IoClose
            size={24}
            className="cursor-pointer"
            onClick={() => setIsFinal(false)}
          />
        </div>

        <div className="flex-1 bg-white">
          <div className="space-y-3 my-3">
            <div className="bg-white border-y _border-muted">
              <Offer />
            </div>
            <div className="bg-white">
              <div>
                <h1 className="font-bold text-xl text-black pt-5 px-4 font-caros-bold">
                  Add a card
                </h1>
                <p className="mx-5 text-xs">
                  We accept Credit and Debit Cards from Visa, American
                  Express,Sodexo,Mastercard,Diners,Rupay
                </p>
              </div>
              <div className="rounded-lg bg-white p-2 shadow-lg lg:col-span-3 lg:p-12">
                <div className="relative px-3 my-2">
                  <div className="relative z-0 mt-2 mb-2">
                    <input
                      type="text"
                      id="name"
                      className="font-caros block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[1.5px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                      placeholder=" "
                      value={info.name}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="name"
                      className="absolute font-caros-bold text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Name on Card
                    </label>
                  </div>
                  <div className="relative z-0  mt-4 mb-2">
                    <input
                      type="text"
                      id="cardNumber"
                      className="font-caros block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[1.5px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                      placeholder=" "
                      minLength={14}
                      maxLength={16}
                      value={info.cardNumber}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="cardNumber"
                      className="absolute font-caros-bold text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Card Number
                    </label>
                  </div>
                  <div className="relative z-0  mt-4 mb-2">
                    <input
                      type="text"
                      id="expiry"
                      className="font-caros block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[1.5px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                      placeholder=" "
                      maxLength={5}
                      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        formatString(e)
                      }
                      value={info.expiry}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="expiry"
                      className="absolute font-caros-bold text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Expiry Date (MM/YY)
                    </label>
                  </div>
                  <div className="relative z-0  mt-4 mb-2">
                    <input
                      type="password"
                      id="cvv"
                      className="font-caros block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[1.5px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                      placeholder=" "
                      maxLength={3}
                      value={info.cvv}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="cvv"
                      className="absolute font-caros-bold text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      CVV
                    </label>
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
        <div className="text-center bottom-0 px-4 pt-2 pb-4 min-h-[68px] _shadow_sticky">
          <div
            className="bg-[#0c831f] cursor-pointer  text-white     px-3 py-3 rounded-lg font-medium text-ld"
            onClick={handlePaymentSubmit}
          >
            Make Payment
          </div>
        </div>
      </aside>
    </div>
  );
};
export default PaymentPage;
function formatString(event: React.KeyboardEvent<HTMLInputElement>) {
  var inputChar = String.fromCharCode(event.keyCode);
  var code = event.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  event.target.value = event.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
}

const AcceptedCards = [
  "amex.webp",
  "maestro.webp",
  "mastercard.webp",
  "visa.webp",
  "rupay.webp",
];

const MonthArray = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
