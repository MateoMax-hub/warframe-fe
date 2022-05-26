let timeout = null;

const useDebounce = (customFunction, time) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => customFunction(), time);
  return;
};

export default useDebounce;
