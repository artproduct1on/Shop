import { useForm } from "react-hook-form";
import s from "./s.module.scss";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { validateField } from "../../utils/helpers";
import errorImg from "../../assets/img/errorImg.svg"

function Form({ onSubmit, formMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  function submitHandle(data) {
    onSubmit(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandle)}
      className={s.form}
      noValidate
    >

      <Input
        variant="outline"
        type="text"
        placeholder="Name"
        error={errors.name?.message}
        register={{
          ...register("name", {
            validate: (value) => validateField("name", value),
          })
        }}
      />

      <Input
        variant="outline"
        type="tel"
        placeholder="Phone Number"
        error={errors.phone?.message}
        register={{
          ...register("phone", {
            validate: (value) => validateField("phone", value),
          })
        }}
      />

      <Input
        variant="outline"
        type="email"
        placeholder="Email"
        error={errors.email?.message}
        register={{
          ...register("email", {
            validate: (value) => validateField("email", value),
          })
        }}
      />

      {formMessage && (
  <p className={formMessage.type === "success" ? s.success : s.error}>
    {formMessage.type === "error" && (
      <img src={errorImg} alt="Error" className={s.errorIcon} />
    )}
    {formMessage.text}
  </p>
)}

      <Button name="Get a discount" type="submit" variant="white" className={s.discountButton} />
    </form>
  );
}

export default Form;
