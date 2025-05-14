const Icon = ({ id }) => (
  <svg aria-hidden="true">
    <use href={`/sprite.svg#${id}`} />
  </svg>
);

export default Icon;