import { useContext } from "react";
import { CountryContext } from "./CountryContext";

export function useCountries() {
    return useContext(CountryContext);
  }