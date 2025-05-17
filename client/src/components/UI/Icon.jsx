
const Icon = ({ id = "" }) => (
  <svg aria-hidden="true">
    <use xlinkHref={`/sprite.svg#${id}`} />
  </svg>
);

export default Icon;
