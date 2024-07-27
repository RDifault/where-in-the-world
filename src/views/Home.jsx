import Header from "../components/Header";
import { useCountries } from "../CountryHooks";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const countryData = useCountries();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    let filtered = countryData;

    filtered = filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    setFilteredCountries(filtered);
  }, [searchQuery, selectedRegion, countryData]);

  return (
    <div className="bg-dgray-50 w-full h-full min-h-[100vh] dark:bg-dblue-500">
      <Header />
      <div className="flex justify-between mt-12 mx-10 md:mx-16 flex-col md:flex-row">
        <form className="mb-8 md:mb-0 ">
          <div className="relative flex justify-center md:justify-normal">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-4 h-4 text-dgray-300 dark:text-dgray-50"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a country..."
              className="block w-[100vw] md:w-[350px] p-4 ps-12 text-sm text-gray-900 shadow-md rounded-md bg-white focus:ring-dblue-700 focus:border-dblue-700 dark:bg-dblue-300 dark:placeholder-dgray-300 dark:text-white dark:focus:ring-dgray-300 dark:focus:border-dgray-300 accent-dgray-300 dark:accent-white"
            />
          </div>
        </form>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="block w-[150px] shadow-md p-4 text-sm text-gray-900 rounded-md bg-white focus:ring-dblue-700 focus:border-dblue-700 dark:bg-dblue-300 dark:placeholder-dgray-300 dark:text-white dark:focus:ring-dgray-300 dark:focus:border-dgray-300 accent-dgray-300 dark:accent-white"
        >
          <option value="" className="">
            Filter by Region
          </option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 flex flex-wrap justify-center z-0">
        {countryData.length === 0 ? (
          <p className=" flex text-center text-dblue-700 font-bold text-3xl h-[100vh] justify-center items-center dark:bg-dblue-500 dark:text-white">
            Loading...
          </p>
        ) : (
          filteredCountries.map((country) => (
            <div
              key={country.cca3}
              className="transition ease-in-out cursor-pointer rounded-lg w-[250px] h-[320px] bg-white dark:bg-dblue-300 shadow-lg m-12 hover:scale-110 hover:shadow-2xl"
            >
              <Link to={`/country/${country.cca3}`}>
                <div className="w-[250px] h-[150px] rounded-t-lg bg-gray-100 flex justify-center items-center dark:bg-dblue-700">
                  <img src={country.flags.png} className="w-[120px] " alt="" />
                </div>

                <div className="p-4">
                  <p className="font-bold text-dblue-700 text-lg mb-4 dark:text-white">
                    {country.name.common}
                  </p>
                  <p className="font-bold text-dblue-700 text-sm mb-1 dark:text-white">
                    Population:
                    <span className="text-dblue-300 text-sm font-normal dark:text-white">
                      {" "}
                      {Intl.NumberFormat().format(country.population)}
                    </span>
                  </p>
                  <p className="font-bold text-dblue-700 text-sm mb-1 dark:text-white">
                    Region:
                    <span className="text-dblue-300 text-sm font-normal dark:text-white">
                      {" "}
                      {country.region}
                    </span>
                  </p>
                  <p className="font-bold text-dblue-700 text-sm dark:text-white">
                    Capital:
                    <span className="text-dblue-300 text-sm font-normal dark:text-white">
                      {" "}
                      {country.capital[0]}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
