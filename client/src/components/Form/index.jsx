import { useForm } from "react-hook-form";
import s from "./s.module.scss";
import Button from "../UI/Button";

function Form({ onSubmit, formMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 2) return "Enter at least 2 letters";
        if (value.length > 50) return "Enter no more than 50 letters";
        return true;
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\+?[0-9\s\-()]{7,20}$/.test(value)) return "Invalid phone number";
        return true;
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return true;
      default:
        return true;
    }
  };

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
      <div className={s.inputWrapper}>
        <input
          className={s.input}
          type="text"
          placeholder="Name"
          {...register("name", {
            validate: (value) => validateField("name", value),
          })}
        />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}
      </div>

      <div className={s.inputWrapper}>
        <input
          className={s.input}
          type="tel"
          placeholder="Phone Number"
          {...register("phone", {
            validate: (value) => validateField("phone", value),
          })}
        />
        {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
      </div>

      <div className={s.inputWrapper}>
        <input
          className={s.input}
          type="email"
          placeholder="Email"
          {...register("email", {
            validate: (value) => validateField("email", value),
          })}
        />
        {errors.email && <p className={s.error}>{errors.email.message}</p>}
      </div>

      {formMessage && (
        <p className={formMessage.type === "success" ? s.success : s.error}>
          {formMessage.text}
        </p>
      )}

      <Button name="Get a discount" type="submit" variant="white" className={s.discountButton} />
    </form>
  );
}

export default Form;
