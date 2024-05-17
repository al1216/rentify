import React, { useEffect, useState, useCallback } from "react";
import "./style.css";
import axios from "axios";
import useStoryContext from "../hooks/useProductContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let navigate = useNavigate();
  let { setPropertyId } = useStoryContext();
  let [properties, setProperties] = useState();
  const onClickIncreaseCount = async (propertyId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/api/${propertyId}/like`
      );
      setProperties(response.data.like); // Return the updated like count
      navigate(0);
    } catch (error) {
      console.error("Error increasing like count:", error);
      throw error;
    }
  };
  const getAllPropertiesFromBackend = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/api/properties`
      );
      setProperties(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }, []); // Empty dependency array ensures this function is stable

  useEffect(() => {
    getAllPropertiesFromBackend();
  }, [getAllPropertiesFromBackend]);
  return (
    <div className="showAvailablePosts">
      {properties &&
        properties.map((property) => (
          <div className="apostCard" key={property._id}>
            <div className="nameAndOtherDetails">
              <p className="nameOfProperty">{property.name}</p>
              <p className="placeOFProperty">Place: {property.place}</p>
              <p className="areadOfProperty">Area: {property.area}</p>
              <p className="priceOfProperty">Price: {property.price}</p>
            </div>

            <div className="likeButtonAndlinkToFullPropertyView">
              <div
                className="alikeCounterForProperty"
                onClick={() => onClickIncreaseCount(property._id)}
              >
                <p className="likeSymbolIcon">⬆︎</p>
                <p className="likeCounter">Likes: {property.like}</p>
              </div>
              <p
                className="linkToShowProperty"
                onClick={() => {
                  setPropertyId(property._id);
                  navigate(`/property/${property._id}`);
                }}
              >
                Click to view the full property ⤤
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
