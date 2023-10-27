import React, { useState, useEffect } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    // Create a variable to track if the component is still mounted to avoid memory leaks.
    let isMounted = true;

    if (!keyword.length) {
      // If the keyword is empty, reset the location and error.
      setLocation(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        if (isMounted) {
          // Only update the state if the component is still mounted.
          setIsLoading(false);
          setLocation(result);
          setError(null); // Reset any previous errors.
        }
      })
      .catch((err) => {
        if (isMounted) {
          // Only update the state if the component is still mounted.
          setIsLoading(false);
          setLocation(null); // Reset the location on error.
          setError(err);
        }
      });

    // Cleanup function to handle unmounting.
    return () => {
      isMounted = false;
    };
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
