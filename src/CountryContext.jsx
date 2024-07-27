import { createContext, useEffect, useState } from "react";
import { FetchCountries } from "./Api";

export const CountryContext = createContext();

export function CountryProvider({children}) {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    FetchCountries().then((data) => {
      setCountryData(data);
    });
  }, []);

  return (
    <CountryContext.Provider value={countryData}>
      {children}
    </CountryContext.Provider>
  )
}
