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
