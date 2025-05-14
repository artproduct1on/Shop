import s from './s.module.scss';

function Hamburger({ isOpen = true, onClick }) {
  return (
    <button
      className={s.btn}
      data-open={isOpen}
      onClick={onClick}
      type="button"
      aria-label="menu"
      aria-controls="menu"
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-pressed={isOpen}
    >
      <hr></hr>
      <hr></hr>
      <hr></hr>
    </button>
  )
};

export default Hamburger;