import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PropertyDisplay.css";
import useStoryContext from "../hooks/useProductContext";

function PropertyDetail() {
  let { propertyId, formData } = useStoryContext();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSellerInfo, setShowSellerInfo] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}/api/property/${propertyId}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const sendEmailToUser = async (sellerInfo) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/api/send-email`,
        { email: localStorage.getItem("email"), sellerInfo }
      );
      return response.data.message;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };
  const handleShowSellerInfo = async (property) => {
    setShowSellerInfo(property);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading property: {error.message}</div>;
  }

  return (
    <div className="property-detail-container">
      {property && (
        <>
          <h2 className="property-name">{property.name}</h2>
          <div className="property-details">
            <p>
              <strong>Place:</strong> {property.place}
            </p>
            <p>
              <strong>Area:</strong> {property.area}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {property.bathrooms}
            </p>
            <p>
              <strong>Price:</strong> {property.price}
            </p>
          </div>
          <div className="nearest-locations">
            <h3>Nearest Hospital</h3>
            <p>
              <strong>Name:</strong> {property.nearest_hospital.name}
            </p>
            <p>
              <strong>Distance:</strong> {property.nearest_hospital.distance}
            </p>
            <h3>Nearest College</h3>
            <p>
              <strong>Name:</strong> {property.nearest_college.name}
            </p>
            <p>
              <strong>Distance:</strong> {property.nearest_college.distance}
            </p>
          </div>
          <button
            className="interested-button"
            onClick={(property) => handleShowSellerInfo(property)}
          >
            I am interested
          </button>
          {showSellerInfo && (
            <div className="seller-info">
              <h3>Seller Information</h3>
              <p>
                <strong>Name:</strong> {property.seller_name}
              </p>
              <p>
                <strong>Contact:</strong> {property.seller_contact}
              </p>
              <p>
                <strong>Email:</strong> {property.seller_email}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PropertyDetail;
