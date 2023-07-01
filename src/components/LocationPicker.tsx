import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { currentLocation, setError, setAddress } from "../store/location";
const LocationPicker = () => {
  const dispatch = useAppDispatch();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const [location, setLocation] = useState<any>({});
  const [err, setErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(true);
        const crd = pos.coords;
        var requestOptions = {
          method: "GET",
        };

        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=1710e3efc9584f3b91f830ed65002ea3`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setLocation(result.features[0].properties);
            dispatch(
              currentLocation({
                latitude: crd.latitude,
                longitude: crd.longitude,
              })
            );
            setLoading(false);
          })
          .catch((error) => {
            throw new Error(error);
          });
      },
      (err) => {
        setErr(true);
        dispatch(setError(err.message));
      },
      options
    );
  }, []);
  dispatch(
    setAddress({
      city: location.city,
      state: location.state,
      state_code: location.state_code,
      postcode: location.postcode,
      country: location.country,
    })
  );
  return (
    <div>
      {!location ? (
        <span className="font-medium _text-default">Select Location</span>
      ) : (
        <div className="flex flex-col">
          <p className="font-semibold text-lg leading-tight">
            Delivery in 30 minutes
          </p>
          <span className="text-sm _text-default font-bold">
            {err
              ? "Please Allow Location Detect"
              : loading
              ? "Fetching Location"
              : `Deliver to ${location.city}-${location.state_code}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
