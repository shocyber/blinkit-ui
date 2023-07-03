import { ProductsRow } from "../components/home";
import { useEffect, useState } from "react";

import Spinner from "../components/shared/Spinner";
import { useAppSelector } from "../hooks/useAppSelector";
import Misc from "../lib/data/layout.json";
import { useDeviceData } from "react-device-detect";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setDevice } from "../store/device";
import instance from "../utils/instance";

const Home = () => {
  const loader = useAppSelector((state) => state.loader.visible);
  const [productItems, setProductItems] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const dispatch = useAppDispatch();
  const D_info = useDeviceData(navigator.userAgent);
  const fetchProductItems = async () => {
    const { data } = await instance.get("/get-products");
    setProductItems(data.products);
    setTimeout(() => {
      setProductLoading(false);
    }, 800);
  };
  useEffect(() => {
    fetchProductItems();
    dispatch(
      setDevice({
        model: D_info.device.model,
        vendor: D_info.device.vendor,
        os: `${D_info.os.name} ${D_info.os.version}`,
      })
    );
  }, []);

  return (
    <div className="_container">
      {productLoading && <Spinner type="bounce" />}
      {loader && <Spinner type="spinner" />}
      <ProductsRow products={productItems} />
    </div>
  );
};

export default Home;
