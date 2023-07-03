import { IoClose } from "react-icons/io5";
import { DiscountOffer } from "../../utils/types";

type DiscountInfoProps = {
  data: DiscountOffer | null;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DiscountInfo = ({ data, onClose }: DiscountInfoProps) => {
  return (
    data && (
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute text-white cursor-pointer p-3 right-1 top-1"
        >
          <IoClose size={24} />
        </button>
        <div
          className="pt-12 px-5 pb-7"
          style={{ backgroundColor: data.bg_color, color: data.text_color }}
        >
          <div className="w-[156px] h-8">
            <img
              src={data.bottomsheet_image_url}
              alt=""
              className="h-full object-contain object-left w-full"
            />
          </div>
          <h5 className="mt-2 pb-2 text-2xl font-bold leading-none">
            {data.title}
          </h5>
          <p className="text-sm font-medium">{data.subtitle}</p>
        </div>
        <div className="bg-white py-2 px-4">
          <h4 className="mt-4 mb-3 text-[15px] _text-muted">
            {data.content[0].heading}
          </h4>
          <ul className="list-disc ml-4 space-y-2 mb-2">
            {data.content[0].data.map((el, i) => (
              <li key={i} className="text-xs _text-default">
                {el}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default DiscountInfo;
