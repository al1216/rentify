import React, { useCallback, useEffect, useState } from "react";
import "./PropertyForm.css"; // Import your CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PropertyForm() {
  let navigate = useNavigate(null);
  const [property, setProperty] = useState({
    name: "",
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    nearest_hospital: {
      name: "",
      distance: "",
    },
    nearest_college: {
      name: "",
      distance: "",
    },
    seller_name: "",
    seller_contact: "",
    seller_email: "",
    like: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const addSellersDetails = useCallback(async () => {
    try {
      const sellerInfoResponse = await axios.get(
        `${process.env.REACT_APP_HOST}/api/user/${localStorage.getItem(
          "email"
        )}`
      );
      const sellerInfo = sellerInfoResponse.data;
      console.log(sellerInfo);
      // Update the property state with the fetched data
      setProperty((prevProperty) => ({
        ...prevProperty,
        seller_name: sellerInfo.name,
        seller_contact: sellerInfo.phone,
        seller_email: sellerInfo.email,
      }));
    } catch (error) {
      console.error("Error fetching seller information:", error);
    }
  }, [setProperty]);

  useEffect(() => {
    if (!property.seller_name) {
      // Check if seller information is already present
      addSellersDetails();
    }
  }, [addSellersDetails, property.seller_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_HOST}/api/add-property`, {
        property,
      });
      console.log("Property added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="property-form-container">
      <h2>Property Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Place:
          <input
            type="text"
            name="place"
            value={property.place}
            onChange={handleChange}
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={property.area}
            onChange={handleChange}
          />
        </label>
        <label>
          Bedrooms:
          <input
            type="number"
            name="bedrooms"
            value={property.bedrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Nearest Hospital Name:
          <input
            type="text"
            name="nearest_hospital_name"
            value={property.nearest_hospital.name}
            onChange={(e) =>
              setProperty({
                ...property,
                nearest_hospital: {
                  ...property.nearest_hospital,
                  name: e.target.value,
                },
              })
            }
          />
        </label>
        <label>
          Nearest Hospital Distance:
          <input
            type="text"
            name="nearest_hospital_distance"
            value={property.nearest_hospital.distance}
            onChange={(e) =>
              setProperty({
                ...property,
                nearest_hospital: {
                  ...property.nearest_hospital,
                  distance: e.target.value,
                },
              })
            }
          />
        </label>
        <label>
          Nearest College Name:
          <input
            type="text"
            name="nearest_college_name"
            value={property.nearest_college.name}
            onChange={(e) =>
              setProperty({
                ...property,
                nearest_college: {
                  ...property.nearest_college,
                  name: e.target.value,
                },
              })
            }
          />
        </label>
        <label>
          Nearest College Distance:
          <input
            type="text"
            name="nearest_college_distance"
            value={property.nearest_college.distance}
            onChange={(e) =>
              setProperty({
                ...property,
                nearest_college: {
                  ...property.nearest_college,
                  distance: e.target.value,
                },
              })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PropertyForm;
