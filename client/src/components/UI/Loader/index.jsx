import s from "./s.module.scss";

export default function Loader() {
  return (
    <div className={s.container}>
      <span className={s.loader}></span>
    </div>
  );
};
