
function Input({
  type = "text",
  placeholder = "...",
  className = "",
  required = true,
  ...rest
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      required={required}
      {...rest}
    />
  );
}

export default Input;