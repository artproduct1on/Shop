export function searchItemHelper(array, targetId) {
  return array?.find(i => +i.id === +targetId);
};

export function formatPrice(price) {

  const fixPrice = price.toFixed(2);

  if (fixPrice.endsWith(".00")) {
    return price.toFixed(0);
  } if (fixPrice.endsWith("0")) {
    return price.toFixed(1);
  } else {
    return fixPrice;
  };
};

export function totalPrice(list) {
  return list.reduce((acc, item) =>
    acc + (item.price - item.discont_price) * item.quantity
    , 0);
}

export function validateField(name, value) {
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
