/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./ErrorPopup.css";

const ErrorPopup = ({ setError }) => {
  const popupRef = useRef();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      popupRef.current.style.animation = "dropOut 1s forwards";
      setTimeout(() => {
        setError(false);
      }, 3800);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [setError]);

  return (
    <div className="error" ref={popupRef}>
      <h3>Location Not Found!!</h3>
      <p>Please try again</p>
    </div>
  );
};

export default ErrorPopup;
