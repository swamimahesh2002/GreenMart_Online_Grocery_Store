import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Payment.scss";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <div className="payment">
      Payment Page
      <button
        onClick={() => {
          navigate("/");
          toast.success("Order has been placed!!");
        }}
      >
        Pay{" "}
      </button>
    </div>
  );
};

export default Payment;
