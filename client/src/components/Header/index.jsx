import { useState } from "react";
import { Link } from "react-router-dom";
import s from './s.module.scss'
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
    if (classTarget === s.nav || classTarget === s.link) {
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

      <nav
        className={s.nav}
        data-open={isOpenMenu}
        onClick={handleClickMenu}
      >
        <ul className={s.list}>
          <li className={s.li}>
            <Link
              className={s.link}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className={s.li}>
            <Link
              className={s.link}
              to="/categories"
            >
              Categories
            </Link>
          </li>
          <li className={s.li}>
            <Link
              className={s.link}
              to="/categories/all"
            >
              All products
            </Link>
          </li>
          <li className={s.li}>
            <Link
              className={s.link}
              to="/categories/sales"
            >
              All sales
            </Link>
          </li>
        </ul>
      </nav>

    </header>
  )
};

export default Header;