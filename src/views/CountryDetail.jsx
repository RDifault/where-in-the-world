import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCountries } from "../CountryHooks";

export default function CountryDetail() {
  const { code } = useParams();
  const countries = useCountries();
  const [countryDetail, setCountryDetail] = useState(null);

  useEffect(() => {
    if (countries.length > 0) {
      const countryData = countries.find((country) => {
        console.log(`Checking country: ${country.cca3}`);
        if (country.cca3 === code) {
          return country.cca3;
        } else {
          console.log(`Country does not match: ${country.cca3}`);
          return null;
        }
      });
      setCountryDetail(countryData);
    }
  }, [code, countries]);

  if (!countryDetail) {
    return (
      <>
        <Header />
        <p className=" flex text-center text-dblue-700 font-bold text-3xl h-[100vh] justify-center items-center dark:bg-dblue-300 dark:text-white">
          Loading...
        </p>
      </>
    );
  }

  const borderCountries = countryDetail.borders
    ? countryDetail.borders.map((borderCode) => {
        const borderCountry = countries.find((c) => c.cca3 === borderCode);
        return borderCountry;
      })
    : [];

  console.log(countryDetail);

  return (
    <>
      <Header />
      <div className="bg-dgray-50 w-full h-full min-h-[100vh] dark:bg-dblue-500 p-6 py-12 md:p-16">
        <Link to="/">
          <button className="flex items-center px-8 bg-white text-dblue-700 dark:bg-dblue-300 dark:text-white rounded-md shadow-lg text-center justify-center hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 dark:fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>

            <p className="px-4 py-2">Back</p>
          </button>
        </Link>

        <div className="flex flex-col justify-center items-center mt-16 xl:flex-row">
          <img
            src={countryDetail.flags.svg}
            className="flex h-[150px] xl:mr-32 xl:h-[300px]"
            alt=""
          />
          <div className="mt-8 xl:mt-0">
            <p className="text-3xl font-bold text-dblue-700 dark:text-white mb-8">
              {countryDetail.name.common}
            </p>
            <div className="flex flex-wrap">
              <div className="flex flex-col flex-wrap mr-32">
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Native Name:{" "}
                  <span className="font-normal">
                    {Object.values(countryDetail.name.nativeName)
                      .map((native) => native.common)
                      .join(", ")}
                  </span>
                </p>
                {/* {console.log(Object.values(countryDetail.name).map(native => native.common))} */}
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Population:{" "}
                  <span className="font-normal">
                    {Intl.NumberFormat().format(countryDetail.population)}
                  </span>
                </p>
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Region:{" "}
                  <span className="font-normal">{countryDetail.region}</span>
                </p>
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Sub Region:{" "}
                  <span className="font-normal">
                    {countryDetail.subregion ? countryDetail.subregion : "None"}
                  </span>
                </p>
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Capital:{" "}
                  <span className="font-normal">{countryDetail.capital}</span>
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Top Level Domain:{" "}
                  <span className="font-normal">{countryDetail.tld}</span>
                </p>
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Currencies:{" "}
                  <span className="font-normal">
                    {Object.values(countryDetail.currencies)
                      .map((currency) => currency.name)
                      .join(", ")}
                  </span>
                </p>
                <p className="mb-4 text-dblue-700 font-bold dark:text-white">
                  Languages:{" "}
                  <span className="font-normal">
                    {Object.values(countryDetail.languages)
                      .map((language) => language)
                      .join(", ")}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-wrap mt-12 text-dblue-700 font-bold dark:text-white lg:flex-row lg:items-center">
              <p className="mr-4">Border Countries: </p>
              <div className="flex flex-wrap">
                {borderCountries.length > 0
                  ? borderCountries.map((borderCountry) => (
                      <Link
                        key={borderCountry.cca3}
                        to={`/where-in-the-world/country/${borderCountry.cca3}`}
                      >
                        <button className="flex flex-wrap text-xs font-normal items-center mr-4 px-8 my-2 bg-white text-dblue-700 dark:bg-dblue-300 dark:text-white rounded-md shadow-lg text-center justify-center hover:scale-110 md:text-sm">
                          <p className="px-0 py-2">
                            {borderCountry.name.common}
                          </p>
                        </button>
                      </Link>
                    ))
                  : "None"}
              </div>

              {/* {countryDetail.borders.length < 1
                  ? "None"
                  : countryDetail.borders.map((border) => (
                      <Link key={border} to={`/country/${border}`}>
                        <button className="flex text-sm items-center mr-4 px-4 bg-white text-dblue-700 dark:bg-dblue-300 dark:text-white rounded-md shadow-lg text-center justify-center hover:scale-110">
                          <p className="px-4 py-2">{border}</p>
                        </button>
                      </Link>
                    ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
