import { post } from "../utils/api";
import { LOCAL_STORAGE_KEYS, API_POST } from "../utils/constants";
import { getFromStorage, setToStorage } from "../utils/localStorage";

export default async function discountService(data) {

  try {
    const storedData = await getFromStorage(LOCAL_STORAGE_KEYS.DISCOUNT);

    if (storedData?.find(i => i.phone === data.phone || i.email === data.email))
      return { type: "error", text: "Wrong input. Try again" };

    const res = await post(API_POST.SALE, data);

    if (res.statusText === "OK") {
      setToStorage(
        LOCAL_STORAGE_KEYS.DISCOUNT,
        storedData ? [...storedData, data] : [data]
      );

      return {
        type: "success",
        text: "The discount has been successfully sent to your email.",
      };
    };

    return {
      type: "error",
      text: res.message
    };

  } catch {
    return { type: "error", text: "Something Wrong. Try again later!" };
  }
}
