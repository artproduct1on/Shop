export const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return !data ? null : JSON.parse(data);
  } catch (error) {
    console.error(`Error "${key}":`, error);
    return null;
  }
};
export const setToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error "${key}":`, error);
  }
};
