import React from "react";
import "./AddPropertyPost.css";
import { useNavigate } from "react-router-dom";
export default function AddPropertyPost() {
  let navigate = useNavigate(null);
  return (
    <div className="addPropertyPostBox">
      <button class="addProperty-btn" onClick={() => navigate("/add-property")}>
        + Add Property
      </button>
    </div>
  );
}
