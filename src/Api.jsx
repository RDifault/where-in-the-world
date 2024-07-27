async function FetchCountries() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,region,subregion,population,borders,currencies,cca3,cioc,tld`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching countries data:", error);
        return {
            error: "Error fetching countries data"
        };
    }
}

export { FetchCountries };