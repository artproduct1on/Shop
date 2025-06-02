import s from "./s.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  changeQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import Loader from "../../components/UI/Loader";
import Button from "../../components/UI/Button";
import LinkPages from "../../components/UI/LinkPages";
import formatPrice from "../../utils/formatPrice";
import Price from "../../components/UI/Price";
import Icon from "../../components/UI/Icon";
import QuantityInput from "../../components/UI/QuantityInput";
import SectionHeader from "../../components/SectionHeader";

function Cart() {
  const dispatch = useDispatch();
  const { cartList, status } = useSelector((state) => state.cart);
  console.log(cartList);

  if (status === "loading") {
    return <Loader></Loader>;
  }
  if (status === "failed") {
    return <div className={s.cart}>Error loading cart</div>;
  }
  if (cartList.length === 0) {
    return (
      <>
        <section className={s.sectionCartIsEmpty}>
          <SectionHeader
            title="Shopping cart"
            LinkPagesTitle="Back to the store"
            LinkPagesTo="/"
          ></SectionHeader>
          <p>Looks like you have no items in your basket currently.</p>
          <Button
            name="Continue Shopping"
            to="/products"
            variant="green"
            className = {s.buttonCartisEmpty}
          ></Button>
        </section>
      </>
    );
  }
  const total = cartList.reduce(
    (sum, item) => sum + (item.discont_price || item.price) * item.quantity,
    0
  );

  return (
    <>
      <section className={s.sectionCart}>
        <h2 className={`section-title ${s.cartTitle}`}>Shopping cart</h2>

        <ul className={s.cartList}>
          {cartList.map((item) => (
            <li key={item.id} className={s.cartItem}>
              <img src={item.image} className={s.cartImg}></img>
              <div className={s.cartContent}>
                <h3 className={s.cartContentTitle}>{item.title}</h3>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className={s.removeButton}
                >
                  <Icon id="clear" />
                </button>
                <QuantityInput
                  className={s.cartContentQuantity}
                  value={item.quantity}
                  min={1}
                  max={100}
                  onQuantityChange={(num) =>
                    dispatch(changeQuantity({ id: item.id, num }))
                  }
                />

                <Price
                  className={s.cartContentPrice}
                  price={item.price}
                  discont={item.discont_price}
                  quantity={item.quantity}
                  variant="small"
                />
              </div>
            </li>
          ))}
        </ul>
        <LinkPages title="Back to the store" to="/" className={s.cartLink} />
      </section>
    </>
  );
}

export default Cart;

{
  /* <p className={s.total}>Total: ${formatPrice(total)}</p> */
}
