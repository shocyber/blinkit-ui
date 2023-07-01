import { useEffect } from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import BrandPromotion from "./BrandPromotion";
import CartButtonBig from "./cart/CartButtonBig";
import Modal from "./Modal";
import { CartPanel } from "./cart";
import AddressBar from "./address/Address";
import { useAppSelector } from "../hooks/useAppSelector";
import PaymentPage from "./payment/PaymentPage";

type Props = {
  noFooter?: boolean;
  component: React.ReactElement;
};

const Layout = ({ noFooter, component }: Props) => {
  const modalShown = useAppSelector((state) => state.modal.visible);
  const cartShown = useAppSelector((state) => state.ui.cartPanel);
  const addressPanel = useAppSelector((state) => state.address.addressPanel);
  const payment = useAppSelector((state) => state.payment.payment);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <Header />
        <main className="pt-28 sm:pt-24">{component}</main>
        {!noFooter && (
          <>
            <BrandPromotion />
            <Footer />
          </>
        )}
        <CartButtonBig />
      </div>

      {payment && <PaymentPage />}
      {addressPanel && <AddressBar />}
      {cartShown && <CartPanel />}
      {modalShown && <Modal />}
    </>
  );
};

export default Layout;
