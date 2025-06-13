
const Icon = ({ id = "", classname }) => (
  <svg aria-hidden="true">
    <use xlinkHref={`/sprite.svg#${id}`} className={classname} />
  </svg>
);

export default Icon;
