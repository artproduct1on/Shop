import s from "./s.module.scss";

export default function Input({
  variant = "outline",
  type = "text",
  placeholder = "",
  error = null,
  register
}) {
  return <div className={s.wrapper}>
    <input
      className={`${s.input} ${variant === "outline" ? s.outline : s.background}`}
      type={type}
      {...register}
      placeholder={placeholder}
    />
    {error && <p className={s.error}>{error}</p>}
  </div>;

}
