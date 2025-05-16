
const Icon = ({ id }) => (
  <svg aria-hidden="true">
    <use xlinkHref={`/Sprite.svg#${id}`} />
  </svg>
);

export default Icon;