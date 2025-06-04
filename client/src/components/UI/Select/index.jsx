import { useState } from "react";
import s from "./s.module.scss";
import Icon from "../Icon";

function Select({
  id,
  options = [],
  value = options[0] || { title: "No value", value: null },
  onChange,
  className,
}) {

  const [isOpen, setIsOpen] = useState(false);

  function clickHeandler(i) {
    onChange(i);
    setIsOpen(false);
  }

  return (
    <div className={s.block}>
      <button
        className={s.btn}
        id={id}
        type="button"
        data-active={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {value.title}
        <Icon id="arrowDown" />
      </button>
      {
        isOpen && <ul className={`${s.ul} ${className}`}>

          {options.map(i =>
            <li
              className={s.li}
              data-active={value.value === i.value}
              key={i.value}
              onClick={() => clickHeandler(i)}
            >
              {i.title}
            </li>
          )}

        </ul>
      }
    </div>
  );
}

export default Select; 
