import Icon from "../UI/Icon";
import s from "./s.module.scss";

function Congratulations({ handleCloseModal }) {
  return (
    <div
      className={s.modal}
      onClick={handleCloseModal}
    >

      <div
        className={s.modalOverlay}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={s.modalBtn}
          onClick={handleCloseModal}
          type="button"
        >
          <Icon id="clear" />
        </button>

        <h2 className={s.modalTitle}>Congratulations!</h2>
        <p className={s.modalText}>
          Your order has been successfully placed on the website.
          <br /> <br />
          A manager will contact you shortly to confirm your order.
        </p>

      </div>

    </div>
  );
}
export default Congratulations;
