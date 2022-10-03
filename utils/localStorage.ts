const getItem = (key: string) => localStorage.getItem(key);

const setItem = <T extends string>(key: T, value: T) => {
  if (key && value) localStorage.setItem(key, value);
};

const removeItem = <T extends string>(key: T) => localStorage.removeItem(key);

const clearAllLS = () => {
  localStorage.clear();
};

export { getItem, setItem, removeItem, clearAllLS };
