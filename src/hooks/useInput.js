import { useState } from "react";

const useInput = (validation) => {
  const [value, setValue] = useState("");
  const [isValueTouched, setIsValueTouched] = useState(false);

  const isValid = validation(value);
  const hasError = !isValid && isValueTouched;

  const valueChangedHandler = (event) => {
    setValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsValueTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsValueTouched(false);
  };

  return {
    value,
    isTouched: isValueTouched,
    isValid,
    hasError,
    valueChangedHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
