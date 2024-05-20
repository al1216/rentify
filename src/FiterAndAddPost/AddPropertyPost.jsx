import React from "react";
import "./AddPropertyPost.css";
import { useNavigate } from "react-router-dom";

export default function AddPropertyPost() {
  let navigate = useNavigate(null);
  let onClickAddPropertBtn = () => {
    const email = localStorage.getItem("email");
    email != null ? navigate("/add-property") : navigate("/login");
  };
  return (
    <div className="addPropertyPostBox">
      <button class="addProperty-btn" onClick={() => onClickAddPropertBtn()}>
        + Add Property
      </button>
    </div>
  );
}
