import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./s.module.scss";
import Hamburger from "../UI/Hamburger";
import Icon from "../UI/Icon";
import useScrollLock from "../../hooks/useScrollLock";

function Header() {

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [animation, setAnimation] = useState(false);

  const { cartList, cartCount } = useSelector((state) => state.cart);

  const animationTimeoutRef = useRef(null);
  useEffect(() => {
    if (cartList.length > 0) {
      setAnimation(true);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setAnimation(false);
      }, 500);
    } else {
      setAnimation(false);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
    }
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [cartList]);

  useScrollLock(isOpenMenu);

  function handleOpenMenu() {
    setIsOpenMenu(!isOpenMenu);
  };
  function handleClickMenu(e) {
    const classTarget = e.target.className;
    if (classTarget === s.nav || classTarget === s.navLink) {
      setIsOpenMenu(false);
    };
  };

  return (
    <header className={s.header}>
      <Link
        className={s.logo}
        to="/"
      >
        <img
          src="/logo.svg"
          alt="Logo"
        />
      </Link>

      <nav
        className={s.nav}
        data-open={isOpenMenu}
        onClick={handleClickMenu}
      >
        <ul className={s.navList}>
          <li className={s.navLi}>
            <Link
              className={s.navLink}
              to="/"
            >
              Main Page
            </Link>
          </li>
          <li className={s.navLi}>
            <Link
              className={s.navLink}
              to="/categories"
            >
              Categories
            </Link>
          </li>
          <li className={s.navLi}>
            <Link
              className={s.navLink}
              to="/products"
            >
              All products
            </Link>
          </li>
          <li className={s.navLi}>
            <Link
              className={s.navLink}
              to="/sales"
            >
              All sales
            </Link>
          </li>
        </ul>
      </nav>

      <Link
        className={s.cart}
        to="/cart"
        aria-label="cart"
        aria-controls="cart"
      >
        {
          cartCount > 0 &&
          <span className={s.count} data-animation={animation}>
            {cartCount}
          </span>
        }
        <Icon id="cart" />
      </Link>

      <Hamburger isOpen={isOpenMenu} onClick={handleOpenMenu} />

    </header>
  );
};

export default Header;
