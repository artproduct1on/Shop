import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./s.module.scss";
import Hamburger from "../UI/Hamburger";
import Icon from "../UI/Icon";

function Header() {

  const count = 1; // waiting for Redux

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const handleClickMenu = (e) => {
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
              to="/categories/all"
            >
              All products
            </Link>
          </li>
          <li className={s.navLi}>
            <Link
              className={s.navLink}
              to="/categories/sales"
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
          count > 0 &&
          <span className={s.count}>
            {count}
          </span>
        }
        <Icon id="cart" />
      </Link>

      <Hamburger isOpen={isOpenMenu} onClick={handleOpenMenu} />

    </header>
  );
};

export default Header;
